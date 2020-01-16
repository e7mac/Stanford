#----------------------------------------------------------------
# Platform-specific build tools
#----------------------------------------------------------------
CC := g++

OBJSUFFIX        := .o
LIBPREFIX        := lib
STATIC_LIBSUFFIX := .a


#----------------------------------------------------------------
# Static Library Variables
#----------------------------------------------------------------
SGLDIR := ../libsgl
STDIR  := ../libst

SGLLIB := $(addsuffix $(STATIC_LIBSUFFIX), sgl)
SGLLIB := $(addprefix $(LIBPREFIX), $(SGLLIB))
SGLLIB := $(SGLDIR)/lib/$(SGLLIB)

STLIB  := $(addsuffix $(STATIC_LIBSUFFIX), st)
STLIB  := $(addprefix $(LIBPREFIX), $(STLIB))
STLIB  := $(STDIR)/lib/$(STLIB)


#----------------------------------------------------------------
# Compiler and Linker flags
#----------------------------------------------------------------
INCLUDE_DIRS := $(STDIR)/include $(SGLDIR)
INCLUDE_DIRS := $(addprefix -I, $(INCLUDE_DIRS))

CFLAGS := $(INCLUDE_DIRS)

LIBS := glut st sgl png jpeg
LIBS := $(addprefix -l, $(LIBS))

LD_FLAGS := -L$(STDIR)/lib -L$(SGLDIR)/lib $(LIBS)


#----------------------------------------------------------------
# Dependencies
#----------------------------------------------------------------

all: make_sgl assignment2 

# Invoke sgl Makefile (which in turn invokes st makefile)
make_sgl:
	@(cd $(SGLDIR); make)

assignment2: main.o $(SGLLIB) $(STLIB)
	$(CC) -o $@ $(LD_FLAGS) $^

main.o: main.cpp
	$(CC) $(CFLAGS) -o $@ -c $^

clean:
	rm -rf *~ *.o assignment2 \#*
