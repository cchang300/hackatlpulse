"""
PyAudio Example: Make a wire between input and output (i.e., record a
few samples and play them back immediately).

This is the callback (non-blocking) version.
"""

from sys import byteorder
from array import array
from struct import pack

import matplotlib.pyplot as plt
import pyaudio
import time
import sys
import numpy as np
import os
import base64
from struct import *

WIDTH = 2
CHANNELS = 2
RATE = 44100

p = pyaudio.PyAudio()
r = array('h')
y = [];
a = open('python.pcm','w+')



def callback(in_data, frame_count, time_info, status):

    #a.write(in_data);
    s = []
    
    snd_data = array('h', in_data)
    for i in snd_data:
        s.append(base64.b64encode(str(i))); #shoudl be i
        

    print("---".join(s),) #- is kind of unsafe, could be used by base64.
    
    # to optimize this, we could use pack to have the ints directly encoded in base64

    return (in_data, pyaudio.paContinue)

stream = p.open(format=pyaudio.paInt16,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                output=False,
                stream_callback=callback)

stream.start_stream()

while stream.is_active():
    time.sleep(10);
#stream.stop_stream();
#plt.plot(y);
#plt.show();
