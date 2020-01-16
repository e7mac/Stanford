#include "parseConfig.h"
#include "STImage.h"
#include <stdio.h>
#include <sstream>
#include <string.h>

void parseConfigFile(
        const char configFname[],
        char image1fnameOut[],
        char image2fnameOut[],
        char saveFnameOut[],
        char loadFnameOut[],
        STImage** im1out,
        STImage** im2out
)
{
    FILE * configFile = fopen(configFname, "r");
    char fileLine[BUFSIZ];

    if(!configFname)
    {
        fprintf(stderr, "Cannot open file %s\n", configFname);
        return;
    }

    while( fgets(fileLine, BUFSIZ, configFile) )
    {
        std::string fileLineStr(fileLine);

        // Parse windows newline correctly ("\r\n")
        if(fileLineStr[fileLineStr.size()-2] == '\r' &&
                fileLineStr[fileLineStr.size()-1] == '\n' )
        {
            fileLineStr[fileLineStr.size()-2] = '\0';
        }
        // replace newline with NULL character
        else if(fileLineStr[fileLineStr.size()-1] == '\n')
        {
            fileLineStr[fileLineStr.size()-1] = '\0';
        }

        // read valid attribute/value pairs
        if(fileLineStr.substr(0,11) == "background1") {
            strcpy(image1fnameOut, fileLineStr.substr(12).c_str());
            *im1out = new STImage(image1fnameOut);
        }
        else if(fileLineStr.substr(0,11) == "background2") {
            strcpy(image2fnameOut, fileLineStr.substr(12).c_str());
            *im2out = new STImage(image2fnameOut);
        }
        else if(fileLineStr.substr(0,8) == "savefile") {
            strcpy(saveFnameOut, fileLineStr.substr(9).c_str());
        }
        else if(fileLineStr.substr(0,8) == "loadfile") {
            strcpy(loadFnameOut, fileLineStr.substr(9).c_str());
        }
    }
    fclose(configFile);
}

void loadLineEditorFile(
        const char lineEditorFname[],
        void (*drawLineCallback)(STPoint2,STPoint2,ImageChoice),
        char image1fnameOut[],
        char image2fnameOut[],
        STImage** im1out,
        STImage** im2out
)
{
    FILE * lineEditorFile = fopen(lineEditorFname, "r");
    char fileLine[BUFSIZ];

    if(!lineEditorFname)
    {
        fprintf(stderr, "Cannot open file %s\n", lineEditorFname);
        return;
    }

    ImageChoice imageChoice = BOTH_IMAGES;

    while( fgets(fileLine, BUFSIZ, lineEditorFile) )
    {
        std::string fileLineStr(fileLine);

        // Parse windows newline correctly ("\r\n")
        if(fileLineStr[fileLineStr.size()-2] == '\r' &&
                fileLineStr[fileLineStr.size()-1] == '\n' )
        {
            fileLineStr[fileLineStr.size()-2] = '\0';
        }
        // replace newline with NULL character
        else if(fileLineStr[fileLineStr.size()-1] == '\n')
        {
            fileLineStr[fileLineStr.size()-1] = '\0';
        }

        // read valid attribute/value pairs
        if(fileLineStr.substr(0,11) == "background1") {
            strcpy(image1fnameOut, fileLineStr.substr(12).c_str());
            *im1out = new STImage(image1fnameOut);
            imageChoice = IMAGE_1;
        }
        else if(fileLineStr.substr(0,11) == "background2") {
            strcpy(image2fnameOut, fileLineStr.substr(12).c_str());
            *im2out = new STImage(image2fnameOut);
            imageChoice = IMAGE_2;
        }
        else if(fileLineStr.substr(0,4) == "line") {
            std::string lineStr = fileLineStr.substr(5);
            std::istringstream lineStream(lineStr);
            float p1x,p1y,p2x,p2y;
            char trash;

            lineStream >> p1x;
            lineStream.get(trash);
            lineStream >> p1y;
            lineStream.get(trash);

            lineStream >> p2x;
            lineStream.get(trash);
            lineStream >> p2y;
            lineStream.get(trash);

            drawLineCallback(STPoint2(p1x,p1y),
                    STPoint2(p2x,p2y),imageChoice);
        }
    }
    fclose(lineEditorFile);
}

void printLinesToFile(
        FILE* file,
        const std::vector<STPoint2>& lines
)
{
    for(unsigned int index = 0; index < lines.size(); ++index)
    {
        if(index % 2 == 0)
        {
            fprintf(file, "line=%d,%d:", (int)lines[index].x,
                    (int)lines[index].y);
        }
        else
        {
            fprintf(file, "%d,%d\n", (int)lines[index].x,
                    (int)lines[index].y);
        }
    }
}

void saveLineEditorFile(
        const char lineEditorFname[],
        const char image1fname[],
        const char image2fname[],
        const std::vector<STPoint2>& lineEndpts1,
        const std::vector<STPoint2>& lineEndpts2
)
{
    FILE * lineEditorFile = fopen(lineEditorFname, "w");
    if(!lineEditorFname)
    {
        fprintf(stderr, "Cannot open file %s\n", lineEditorFname);
        return;
    }

    fprintf(lineEditorFile, "background1=%s\n", image1fname);
    printLinesToFile(lineEditorFile, lineEndpts1);

    fprintf(lineEditorFile, "background2=%s\n", image2fname);
    printLinesToFile(lineEditorFile, lineEndpts2);

    fclose(lineEditorFile);
}
