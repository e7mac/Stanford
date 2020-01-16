# the name of the compiled binary
TARGET  := morph

# list files to compile and link together
FILES   := morph parseConfig


#################################################################


# The following Makefile rules should work for Linux or Cygwin

CC		 := g++
LD		 := g++
OBJSUFFIX	 := .o
LIBPREFIX	 := lib
STATIC_LIBSUFFIX := .a
LDFLAGS		 :=
FRAMEWORKS       :=
LIBS             := st png jpeg

# Decide compiler flags based on debug/release mode
ifeq ($(RELEASE), 1)
CFLAGS      := -O2
else
CFLAGS      := -g
endif


ARCH=$(shell uname | sed -e 's/-.*//g')

ifeq ($(ARCH), CYGWIN_NT)

# if we're building in cygwin, we'll need to use the
# win32 versions of gl and glut

EXESUFFIX  := .exe
LIBS       += glut32 opengl32

else

ifeq ($(ARCH),Darwin)

# we're building on the mac

EXESUFFIX  :=
FRAMEWORKS += OpenGL GLUT

#
# mac users need to point to the libjpeg include directories
#
EXTRA_INC_DIRS  := /opt/local/include glew/include
EXTRA_LIB_DIRS  := /opt/local/lib

else

# building on Linux

EXESUFFIX  :=
LIBS       += GL GLU glut

#
# hack for myth machines.  Add /usr/lib as an explicit lib dir so
# it gets picked up instead of /usr/pubsw/lib.
#

EXTRA_LIB_DIRS := /usr/lib64 /usr/lib
EXTRA_INC_DIRS := /usr/include/freetype2 glew/include

endif
endif


LIBST      :=  st
LIBST_ROOT :=  ../libst
LIBST_DIR  :=  $(LIBST_ROOT)/lib
LIBST_INC  :=  $(LIBST_ROOT)/include

TARGET     := $(addsuffix $(EXESUFFIX), $(TARGET))

INCDIRS    := . $(LIBST_INC) $(EXTRA_INC_DIRS)
LIBDIRS    := $(LIBST_DIR) $(EXTRA_LIB_DIRS)

CFLAGS     += $(addprefix -I, $(INCDIRS))
LDFLAGS    += $(addprefix -L, $(LIBDIRS))
LDLIBS     := $(addprefix -l, $(LIBS))
LDFRAMEWORKS := $(addprefix -framework , $(FRAMEWORKS))
OBJS       :=  $(addsuffix $(OBJSUFFIX), $(FILES))


.SUFFIXES : .cpp $(OBJSUFFIX)

.PHONY : clean release all

all: $(TARGET)

../libst/lib/libst.a:
	(cd ../libst; make)

$(TARGET): $(OBJS) ../libst/lib/libst.a
	$(LD) -o $(TARGET) $(OBJS) $(LDFLAGS) $(LDLIBS) $(LDFRAMEWORKS)

%.o : %.cpp
	$(CC) $(CFLAGS) -o $@ -c $<


clean:
	rm -rf *$(OBJSUFFIX) $(TARGET) *~ .#*

release:
	@make --no-print-directory RELEASE=1


