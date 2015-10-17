"""
PyAudio Example: Make a wire between input and output (i.e., record a
few samples and play them back immediately).

This is the callback (non-blocking) version.
"""

from sys import byteorder
from array import array
from struct import pack


import pyaudio
import time
import sys
import numpy as np

WIDTH = 2
CHANNELS = 1
RATE = 44100

p = pyaudio.PyAudio()
r = array('h')


def callback(in_data, frame_count, time_info, status):
    #print in_data
    #snd_data = array('h', in_data)
    #if byteorder == 'big':
    #        snd_data.byteswap()
    #r.extend(snd_data)

    audio_data = np.fromstring(in_data, dtype=np.float32)
    
    for x in audio_data:
        print x;
    np.savetxt(sys.stdout, audio_data)
    #sys.stdout.write(in_data);
    return (in_data, pyaudio.paContinue)

stream = p.open(format=pyaudio.paInt16,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                output=False,
                stream_callback=callback)

stream.start_stream()

while stream.is_active():
    time.sleep(0.1)

