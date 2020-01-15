"""
huffman.py -- Does huffman encoding and decoding as part of an audio coder

Written by Mayank as part of Team AAAC for Marina Bosi's CCRMA Music 422 class.

"""
# TODO: ask colin about using vendor things here..
from bitpack import *
import operator
import math


class HuffmanDecoder:
    def __init__(self, dict):
        self.binaryToValue = dict
        self.state = ''

    def DecodeBit(self, bit):
        self.state += str(bit)
        for key in self.binaryToValue:
            if key == self.state:
                self.state = ''
                return True, self.binaryToValue[key]
        return False, 'none'

class Huffman:
    def __init__(self, array, originalBitsPerValue):
        self.data = array
        self.stats = GetStats(array)
#        print self.stats
        self.tree = []
        for key in self.stats:
            node = Node()
            node.setTerminalNode(key,self.stats[key])
            self.tree.append(node)
#            print node
        self.CreateTree()
#        print self.tree
        self.binaryToValue = {}
        ConvertToDict(self.tree, self.binaryToValue, '')
        self.valueToBinary = dict((v,k) for k, v in self.binaryToValue.iteritems())
        self.GetSize()
        self.originalSize = len(array) * originalBitsPerValue
    
    
    
    def GetSize(self):
        self.size = 0
        if len(self.stats) == 1: # special case of only one value
            self.size = 32
        else:
            for key in self.stats:
                self.size += self.stats[key] * len(self.valueToBinary[key])
    
            
            
    
    def CreateTree(self):
        while len(self.tree) > 1:
            node1 = self.GetMinimumNode()
            node2 = self.GetMinimumNode()
            node3 = Node()
            node3.setLeftChild(node1)
            node3.setRightChild(node2)
            self.tree.append(node3)
        # since only one item - no more list just set to node
        self.tree = self.tree[0]

    def GetMinimumNode(self):
        minIndex = -1
        minValue = len(self.data)
        for i in range(len(self.tree)):
            item = self.tree[i]
            if (item.count < minValue):
                minIndex = i
                minValue = item.count
        node = self.tree[minIndex]
        self.tree.pop(minIndex)
#        print 'minValue', minValue
        return node

def ConvertToDict(node, dict, prefix):
    if len(node.children) == 0:
        dict[prefix] = node.value
    else:
        ConvertToDict(node.children[0], dict, prefix + '0')
        ConvertToDict(node.children[1], dict, prefix + '1')

class Node:
    def __init__(self):
        self.count = 0
        self.children = {}
    
    def setLeftChild(self, node):
        self.children[0] = node
        self.count += node.count

    def setRightChild(self, node):
        self.children[1] = node
        self.count += node.count

    def setTerminalNode(self, value, count):
        self.value = value
        self.count = count

    def __str__(self):
        if len(self.children) == 0:
            return str(self.value) + ':' +str(self.count)
        else:
            return 'L:' + str(self.children[0]) + ' R' + str(self.children[1])

def GetStats(array):
    stats = {}
    for i in range(len(array)):
        #key = np.base_repr(array[i])
#        key = array[i].astype(np.int)
        key = array[i]
        if key in stats:
            stats[key] += 1
        else:
            stats[key] = 1
    return stats


# huffman header info - isHuffman, sizeOfTable(10bits), numBitsOfString, numBitsOfValue

def EncodeHuffman(data, bitsPerDataItem):
    originalSize = len(data)*bitsPerDataItem
#    print 'original size:',originalSize
    h = Huffman(data, bitsPerDataItem)
    finalSize = 0
    pb = PackedBits()
    pbSize = len(data) * 10
    table = h.binaryToValue
    sizeTable = len(table)
#    print table
#    print sizeTable
    # yes huffman
    pb.Size(pbSize)
    pb.WriteBits(1, 1)   # yes huffman
    pb.WriteBits(len(table), 10) # size of table
    finalSize += 11
    # get max length of string and max value
    maxLengthOfString = len(max(table.keys(), key=len))
    maxValue = max(table.values())
    bitsForMaxLengthOfString = int(math.ceil(math.log((1 + maxLengthOfString),2)))
    bitsForMaxValue = int(math.ceil(math.log((1 + maxValue),2)))
#    print bitsForMaxValue,bitsForMaxLengthOfString

#    bitsForMaxValue = min(bitsForMaxValue, bitsPerDataItem)
    # TODO : optimize here
    pb.WriteBits(bitsForMaxLengthOfString, 10)
    pb.WriteBits(bitsForMaxValue, 10)

    finalSize += 20
    if bitsForMaxLengthOfString == 0:
        # TODO: optimize here
        pb.WriteBits(data[0],16)
        pb.WriteBits(len(data),16)
        finalSize += 32
    
    else:
        # write table
        for key in table:
            # write binary 1by1
            lengthOfKey = len(key)
            pb.WriteBits(lengthOfKey, bitsForMaxLengthOfString)
            for letter in key:
                    pb.WriteBits(int(letter),1)
                    finalSize += 1
            # write num
            pb.WriteBits(table[key],bitsForMaxValue)
        tableSize = finalSize
#        print 'table:',tableSize
        # write values
        dataStream = ''
        for item in data:
            value = item
            binaryCode = h.valueToBinary[value]
            dataStream += binaryCode
    #    print dataStream
        lengthOfDataStream = len(dataStream)
        pb.WriteBits(lengthOfDataStream,32) #TODO: optimizie bits
        finalSize += 32
        for bit in dataStream:
            pb.WriteBits(int(bit), 1)
            finalSize += 1
    saving = 100.0 * (originalSize - finalSize) / originalSize
    print 'finalSize:',finalSize, 'originalSize:', originalSize, 'pbSize', pbSize
#    print 'length',len(h.data)
#    for key in h.stats:
#        print 'num:',key,'occ:',h.stats[key],'code:',h.valueToBinary[key]
                
#    if (saving == 0):
#        print "ERROR"
#        print 'origBits',bitsPerDataItem, 'bitsForMaxVal', bitsForMaxValue

    return (pb, finalSize, saving)



def DecodeHuffman(binaryData):
    pb = binaryData
    pb.ResetPointers()
    isHuffman = pb.ReadBits(1)
    binaryToValue = {}
    if (isHuffman):
        # read header
        sizeTable = pb.ReadBits(10) # get table length
#        print sizeTable
        bitsForMaxLengthOfString = pb.ReadBits(10)
        bitsForMaxValue = pb.ReadBits(10)
#        print bitsForMaxLengthOfString, bitsForMaxValue
        
        array = []
        
        if bitsForMaxLengthOfString == 0:
            item = pb.ReadBits(16)
            numItems = pb.ReadBits(16)
            for i in range(numItems):
                array.append(item)
        else:
            # read table
            for i in range(sizeTable):
                lengthOfKey = pb.ReadBits(bitsForMaxLengthOfString)
                key = ''
                for i in range(lengthOfKey):
                    letter = pb.ReadBits(1)
                    key += str(letter)
                value = pb.ReadBits(bitsForMaxValue)
                binaryToValue[key] = value
            # read values
            lengthOfDataStream = pb.ReadBits(32)
            dataStream = ''
            for i in range(lengthOfDataStream):
                dataStream += str(pb.ReadBits(1))
    #        print dataStream

            # decode huffman
            decoder = HuffmanDecoder(binaryToValue)
            for bit in dataStream:
                found, value = decoder.DecodeBit(bit)
                if found == True:
                    array.append(value)
        return array


# region splitting code

#def EncodeHuffman(data):
#    data = np.array(data)
#    print 'Input'
#    print data
#    # split data into regions
#    region1,region2,region3 = SplitDataIntoRegions(data)
#    region1Size = len(region1)
#    region2Size = len(region2)
#    region3Size = len(region3)
#    
#    
#    pb = PackedBits()
#    pbIdealSize = (8) + 2*region1Size + (1 + region2Size/8) # first 8 bytes for header
#    pb.Size(pbIdealSize)
#    pb.WriteBits(region1Size, 16)
#    pb.WriteBits(region2Size, 16)
#    pb.WriteBits(region3Size, 16)
#    tableNo = 5
#    pb.WriteBits(tableNo, 16)
#    
##    print region1Size,region2Size,region3Size
#    # pack region 1
#    for i in range(region1Size):
#        pb.WriteBits(region1[i],16)
#    # pack region 2
#    for i in range(region2Size):
#        pb.WriteBits(region2[i],1)
#
#    binaryData = pb
#    bitsSaved = 16*len(data) - pbIdealSize
#    print bitsSaved
#    return (binaryData, bitsSaved)
#
#
#def DecodeHuffman(binaryData,size):
#    pb = binaryData
#    pb.ResetPointers()
#    data = []
#    
#    region1Size = pb.ReadBits(16)
#    region2Size = pb.ReadBits(16)
#    region3Size = pb.ReadBits(16)
#    tableNo = pb.ReadBits(16)
#    
##    print region1Size,region2Size,region3Size,
#
#    # unpack region 1
#    for i in range(region1Size):
#        data.append(pb.ReadBits(16))
#    # unpack region 2
#    for i in range(region2Size):
#        data.append(pb.ReadBits(1))
#    # add zeros
#    for i in range(region3Size):
#        data.append(0)
#    
#    print data
#    return data
#
#def SplitDataIntoRegions(data):
#    region1 = data
#    region2 = []
#    region3 = []
#    N = len(region1)
#
#    # get final list of zeros
#    for i in range(N):
#        if region1[N-i-1] == 0:
#            region3 = np.append(region3, 0)
#            region1 = np.delete(region1, N-i-1)
#        else:
#            break
#
##    # ensure even number of zeros
##    if not len(region3) % 2 == 0:
##        region1 = np.append(region1, 0)
##        region3 = np.delete(region3, len(region3)-1)
#
#    N1 = len(region1)
#    # get list of 1,0s
#    for i in range(N1):
#        if data[N1-i-1] == 0 or data[N1-i-1] == 1:
#            region2.append(data[N1-i-1])
#            region1 = np.delete(region1, N1-i-1)
#        else:
#            break
#
#    # ensure even number of zeros
##    if not len(region2) % 2 == 0:
##        region1.append(region2.pop())
#
#    region2.reverse()
#
#    # return
#    return (region1, region2, region3)
#
