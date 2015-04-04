#   Distributed under the terms of the GPL (GNU Public License)
#
#   NewEdit is free software; you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation; either version 2 of the License, or
#   (at your option) any later version.
#
#   This program is distributed in the hope that it will be useful,
#   but WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with this program; if not, write to the Free Software
#   Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

# Original Author: Aung Kyaw That (MMGEEKS)

# IRC settings - Change the following variables
# according to your IRC server information.

SERVER_HOST = 'irc.mmgeeks.org'
NICK = 'GTalk'
IDENTITY = 'GTalk'
REALNAME = 'Google Talk'
CHANNEL = '#mmgeeks'

# End of IRC Settings
#--------------------

import socket

MAX_RECV = 512
recv_buffer = ''

def send_msg(line):
	print 'SEND', line
	ircSock.send("%s\n\r" % line)

#Used by confbot
def send_priv_msg(msg):
	line = 'PRIVMSG %s :%s' % (CHANNEL, msg)
	send_msg(line)


def recv_msg():
	line = ircSock.recv(MAX_RECV)
	line = line.strip('\n\r')
	print 'RECV', line
	return line


#Used by confbot
def recv_priv_msg():
	global recv_buffer
	try:
		line = ircSock.recv(MAX_RECV)
	except Exception:	#If we did not recieve any new data
		if len(recv_buffer) == 0:
			return
	else:
		recv_buffer += line
		print 'RECV', recv_buffer

	newline = recv_buffer.find('\n')
	if newline != -1:	#Now check message type
		line = recv_buffer[:newline]
		recv_buffer = recv_buffer[newline+1:]	#Continue buffer for next send/receive
		if line.startswith('PING'):
			send_msg('PONG %s' % SERVER_HOST)
		else:
			privmsg_pos = line.find('PRIVMSG')
			if privmsg_pos != -1:
				user = line[1:line.find('!')]
				line = line[privmsg_pos+8:]
				channel = line[:line.find(' ')]
				message = line[line.find(':')+1:]
				if channel == CHANNEL:	#Now we'll pass this to confbot
					return '<IRC><%s> %s' % (user, message)
	return None
		

def connect():
	global ircSock
	ircSock = socket.socket()
	ircSock.connect((SERVER_HOST, SERVER_PORT))
	send_msg('NICK %s' % NICK)
	recv_msg()
	send_msg('USER %s %s %s :%s' % (IDENTITY, IDENTITY, SERVER_HOST, REALNAME))
	line = recv_msg()
	while line.find('Welcome') == -1:	#Wait until we are ready to join a channel
		line=recv_msg()
	send_msg('JOIN %s\n\r' % CHANNEL)
	ircSock.setblocking(0)
	
