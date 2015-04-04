#very simple make file for visual c++

LFLAGS = /incremental:no /fixed

LIBS = kernel32.lib user32.lib gdi32.lib comctl32.lib winspool.lib \
	 comdlg32.lib advapi32.lib shell32.lib ole32.lib \
         oleaut32.lib uuid.lib 

all:  
	cl $(CFLAGS) /Febgl_textpad.exe bgl_textpad.cpp regex.cpp fontmap.cpp burmese.cpp burglish.cpp $(LIBS)
