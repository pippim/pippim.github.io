---
layout:       post
title:        >
    Python read output sound not input
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/68056979
type:         Answer
tags:         python arduino raspberry-pi alsa
created_date: 2021-06-20 14:45:12
edit_date:    
votes:        "0 "
favorites:    
views:        "4,009 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-06-20-Python-read-output-sound-not-input.md
toc:          false
navigation:   false
clipboard:    false
---

I found this [github solution][1]:

[![mserve mouse button hover.gif][2]][2]

I setup the python program as a separate instance so it wouldn't lag my main program. Then poll the IPC pickles every 33 milliseconds (30 fps). I modified the code a bit as you can see below:

``` python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

#==============================================================================
#
#       vu_meter.py - Listen to microphone left/right and generate vu level
#
#==============================================================================
"""

FROM: https://github.com/kmein/vu-meter

.gitignore          NOT INSTALLED
LICENSE             NOT INSTALLED
README.md           NOT INSTALLED
amplitude.py                        THIS MODULE
record.py           NOT INSTALLED
vu_constants.py                     THIS MODULE
vu_meter.py                         THIS MODULE

ENHANCEMENTS:

    1) Support Python environment variable for automatic python 2 / 3 selection
    2) Add UTF-8 to support Python 2 (not necessary in this program though)
    3) Reset maximal between songs (gap when 10 samples of zero strength)
    4) Remove console output and write values to ramdisk (/run/user/1000)
    5) Optional 'stereo' parameter to measure left & right channels
    6) Utilize numpy which is usually auto-installed on distros
    7) Include separate amplitute.py & vu_constants.py in main
    8) Remove unused functions from Amplitude class

"""

from __future__ import print_function       # Must be first import
from __future__ import with_statement       # Error handling for file opens

import pyaudio
import numpy as np              # January 24, 2021 support separate 2 channels
import sys
import math
import struct
#from amplitude import Amplitude

RATE = 44100
INPUT_BLOCK_TIME = 0.05
INPUT_FRAMES_PER_BLOCK = int(RATE*INPUT_BLOCK_TIME)
SHORT_NORMALIZE = 1.0 / 32768.0
# Mono output
VU_METER_FNAME  = "/run/user/1000/mserve.vu-meter-mono.txt"
# Stereo output (Left and Right)
VU_METER_LEFT_FNAME  = "/run/user/1000/mserve.vu-meter-left.txt"
VU_METER_RIGHT_FNAME  = "/run/user/1000/mserve.vu-meter-right.txt"


class Amplitude(object):
    ''' an abstraction for Amplitudes (with an underlying float value)
    that packages a display function and many more
    
    January 25, 2021 - Remove unused add, subb, gt, eq, int & str functions
    '''

    def __init__(self, value=0):
        self.value = value

    def __lt__(self, other):
        return self.value < other.value

    def to_int(self, scale=1):
        ''' convert an amplitude to an integer given a scale such that one can
        choose the precision of the resulting integer '''
        return int(self.value * scale)

    @staticmethod
    def from_data(block):
        ''' generate an Amplitude object based on a block of audio input data '''
        count = len(block) / 2
        shorts = struct.unpack("%dh" % count, block)
        sum_squares = sum(s**2 * SHORT_NORMALIZE**2 for s in shorts)
        return Amplitude(math.sqrt(sum_squares / count))

    def display(self, mark, scale=50, fn=VU_METER_FNAME):
        ''' display an amplitude and another (marked) maximal Amplitude
        graphically '''
        int_val = self.to_int(scale)
        mark_val = mark.to_int(scale)
        delta = abs(int_val - mark_val)
        # print(int_val * '*', (delta-1) * ' ', '|',mark_val,int_val,delta)
        # January 23, 2021: Write values to ramdisk instead of displaying
        with open(fn, "w") as vufile:
            vufile.write(str(mark_val) + " " + str(int_val))


def parse_data(data, channel_ndx, channel_cnt, maximal):
    '''
        Process data from one channel
    '''
    data = np.fromstring(data,dtype=np.int16)[channel_ndx::channel_cnt]
    data = data.tostring()
    amp = Amplitude.from_data(data)
    gap = amp.value      # For signal test below.
    if amp > maximal:
        maximal = amp
    return amp, maximal, gap


def main():

    # January 24, 2021 separate left and right channels
    parameter = 'mono'
    if (len(sys.argv)) == 2:
        parameter = sys.argv[1]     # Null = 'mono', 'stereo' = Left & Right

    audio = pyaudio.PyAudio()
    reset_baseline_count = 0
    try:
        stream = audio.open(format=pyaudio.paInt16,
                            channels=2,
                            rate=RATE,
                            input=True,
                            frames_per_buffer=INPUT_FRAMES_PER_BLOCK
                           )

        maximal = Amplitude()
        maximal_l = maximal_r = maximal

        while True:
            data = stream.read(INPUT_FRAMES_PER_BLOCK)

            # January 24, 2021 separate left and right channels
            if parameter == 'stereo':
                ampl, maximal_l, gap = parse_data(data, 0, 2, maximal_l)
                ampr, maximal_r, gap = parse_data(data, 1, 2, maximal_r)
                if maximal_r < maximal_l:
                    # A momentary spike to left channel inherited by right
                    maximal_r = maximal_l
                if maximal_l < maximal_r:
                    # A momentary spike to right channel inherited by left
                    maximal_l = maximal_r
            else:
                # Mono - processing all dadta
                amp = Amplitude.from_data(data)
                gap = amp.value      # For signal test below.
                if amp > maximal:
                    maximal = amp

            # New code January 23, to reset next song's maximal during gap
            if gap == 0.0:
                reset_baseline_count += 1
                if reset_baseline_count == 10:
                    maximal = Amplitude()
                    maximal_l = maximal_r = maximal
                    # print('maximual reset', maximal.value)
            else:
                reset_baseline_count = 0

            # January 24, 2021 separate left and right channels
            if parameter == 'stereo':
                ampl.display(scale=200, mark=maximal_l, fn=VU_METER_LEFT_FNAME)
                ampr.display(scale=200, mark=maximal_r, fn=VU_METER_RIGHT_FNAME)
            else:
                # Mono processing one channel combined sound
                amp.display(scale=200, mark=maximal, fn=VU_METER_FNAME)

    finally:
        stream.stop_stream()
        stream.close()
        audio.terminate()

if __name__ == "__main__":
    main()
```



  [1]: https://github.com/kmein/vu-meter
  [2]: https://i.stack.imgur.com/ml62T.gif
