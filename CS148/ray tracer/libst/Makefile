

# The following should be correct settings for Linux/Cygwin

CC		 := g++
LD		 := g++
AR		 := ar
OBJSUFFIX	 := .o
LIBPREFIX	 := lib
STATIC_LIBSUFFIX := .a
SHARED_LIBSUFFIX := .so

CFLAGS 		 := -g
LDFLAGS		 :=

###########################################################

.SUFFIXES : .cpp $(OBJSUFFIX)

.PHONY : clean release mkdirs


FILES 		 :=  STColor3f STColor4f STColor4ub STFont STImage STImage_jpeg STImage_png STImage_ppm STPoint2 STPoint3 STJoystick STShaderProgram STShape STTexture STTimer STVector2 STVector3 STTransform4

INCDIRS          := . include
LIBDIRS          := 


ARCH=$(shell uname | sed -e 's/-.*//g')
ifeq ($(ARCH), Linux)
#
# Required to resolve libjpeg link issues on myth machines.  The
# version of jpeglib.h in /usr/pubsw on the myth machines doesn't
# contain an extern "C" declaration.  We want the one in /usr/include
#
INCDIRS          += /usr/include ext/glew/include
FILES            += STJoystick_linux
CFLAGS_PLATFORM  = `freetype-config --cflags`
endif

#
# mac users need to point to the libjpeg include directories

# a default install with fink will put them here

# 
ifeq ($(ARCH), Darwin)
INCDIRS          += /sw/include /opt/local/include
CFLAGS_PLATFORM  = `freetype-config --cflags`
FILES            += STJoystick_darwin
endif


OBJS             :=  $(addsuffix $(OBJSUFFIX), $(FILES))

CFLAGS += $(addprefix -I, $(INCDIRS))
CFLAGS += $(CFLAGS_PLATFORM)

TARGET           :=  st

TARGET           :=  $(addprefix $(LIBPREFIX), $(TARGET))
TARGET  	 :=  $(addsuffix $(STATIC_LIBSUFFIX), $(TARGET))
OUTPUTDIR        :=  lib


all: mkdirs $(OUTPUTDIR)/$(TARGET)


$(OUTPUTDIR)/$(TARGET): $(OBJS)
	ar -rc $@ $(OBJS) 
	ranlib $@

mkdirs:
	@if test ! -d $(OUTPUTDIR); then mkdir $(OUTPUTDIR); fi

%.o : %.cpp
	$(CC) $(CFLAGS) -o $@ -c $<

clean:
	rm -rf *$(OBJSUFFIX) $(OUTPUTDIR)/$(TARGET) *~ .#* #*

release:
	@make --no-print-directory RELEASE=1

