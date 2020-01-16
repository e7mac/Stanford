CC := g++
AR := ar
OBJSUFFIX        := .o
LIBPREFIX        := lib
STATIC_LIBSUFFIX := .a

CFLAGS  := -g # debug flag
LDFLAGS := 

#-----------------------------------------------------------

STDIR    := ../libst
STLIBDIR := $(STDIR)/lib
STINCDIR := $(STDIR)/include

STDEP  := st
STDEP  := $(addprefix $(LIBPREFIX),        $(STDEP))
STDEP  := $(addsuffix $(STATIC_LIBSUFFIX), $(STDEP))

#-----------------------------------------------------------

OUTPUTDIR := lib

TARGET := sgl
TARGET := $(addprefix $(LIBPREFIX),        $(TARGET))
TARGET := $(addsuffix $(STATIC_LIBSUFFIX), $(TARGET))

#-----------------------------------------------------------

INCDIRS := $(STINCDIR)
CFLAGS  += $(addprefix -I, $(INCDIRS))

SRCS := sgl
OBJS := $(addsuffix .o, $(SRCS))
SRCS := $(addsuffix .c, $(SRCS))

.SUFFIXES : .cpp $(OBJSUFFIX)

all: mkdirs update_st $(OUTPUTDIR)/$(TARGET)

# link to 
$(OUTPUTDIR)/$(TARGET): $(STLIBDIR)/$(STDEP) $(OBJS)
	ar -rcs $@ $^

# Create output directory
mkdirs:
	@if test ! -d $(OUTPUTDIR); then mkdir $(OUTPUTDIR); fi

update_st:
	@(cd $(STDIR); make)

%.o: %.cpp %.h
	$(CC) $(CFLAGS) -o $@ -c $<

clean:
	rm -rf \#* *~ *.o $(OUTPUTDIR)/*

