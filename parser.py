import struct
import matplotlib.pyplot as plt



c = [];
a = open("test.wav", 'rb')
for x in range (500):
	b = struct.unpack('<h', a.read(2) );
	print b[0];
	print hex(b[0]);
