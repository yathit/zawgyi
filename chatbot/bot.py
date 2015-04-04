#!/usr/bin/python

#Acknowledgements
#Based on the Python code for a simple IRC bot at
#http://www.osix.net/modules/article/?id=780

import re
import sys
import socket
import string

SERV_HOST = 'irc.mmgeeks.org'   
SERV_PORT = 6667
NICK = 'automaton'
IDENTITY = 'me'
REALNAME = 'Me'
CHANNEL1 = '#mmgeeks'
CHANNEL2 = '#myanmar'
MAX_RECV = 500
nick = NICK.lower()
master = 'akhtet'

def print_send(line):
   print 'SEND', line
   sock.send("%s\n\r" % line)

def print_recv():
   line = sock.recv(MAX_RECV)
   line = line.strip('\n\r')
   print 'RECV', line
   return line

if __name__ == '__main__':
   sock = socket.socket()         #Create the socket
   sock.connect((SERV_HOST, SERV_PORT))      #Connect to server
   print_send('NICK %s' % NICK)   #Send the nick to server
   print_recv()   

   print_send('USER %s %s %s :%s' % (IDENTITY, IDENTITY, SERV_HOST, REALNAME))   #Identify
   line = print_recv()
   while line.find('Welcome') == -1:   #Wait until we are ready to join a channel
      line=print_recv()

   print_send('JOIN %s' % CHANNEL1)    #Join a channel
   print_send('JOIN %s' % CHANNEL2)    #Join a channel
   line=print_recv()
   while True:
      if line.startswith('PING'):
         print_send('PONG %s' % SERV_HOST)
         
      elif line.find('PRIVMSG') != -1:
         tokens = line.split('PRIVMSG')[1].split(' :')
         channel = tokens[0]
         message = tokens[1]
         message = message.lower()
         
         if message.find(nick) != -1:      #When someone talks about me
            saywords = re.match(nick + '.*say(.+)' , message)
            if saywords:
               message = saywords.groups()[0]
            else:
               message = 'What the hell are you talking about ?'
            print_send('PRIVMSG %s :%s' % (channel, message))
         elif message.find(master) != -1:   #When someone talks about my master
            message = 'Did someone just talked about my master ?'
            print_send('PRIVMSG %s :%s' % (channel, message))
         
      line=print_recv()