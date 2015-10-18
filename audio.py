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

    snd_data = array('h', in_data)
    for i in snd_data:
        print i;

    #if byteorder == 'big':
    #        snd_data.byteswap()
    


    #r.extend(snd_data)
    
    #audio_data = np.fromstring('1234', dtype=np.int16)
    #sys.stdout.write(in_data);
    #print 0x1234;
    #for x in snd_data:
    #    a.write(x);
    #    print x;

        #y.append(x);
        #pass
        
    #np.savetxt(sys.stdout, audio_data, fmt='%i')
    

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
