#include <iostream>
#include <fstream>
#include <string>

int main() {
    unsigned short zeroPassCount = 0U;
    unsigned short zeroCount = 0U;
    unsigned char dialPosition = 50;
    std::ifstream inputFile("./input.txt");
    std::string line;

    while(std::getline(inputFile, line)) {
        char symbol = line.at(0);
        unsigned int val = std::stoi(line.substr(1));
        zeroPassCount += val / 100;
        val %= 100;
        if('L' == symbol) {
            if (dialPosition < val) {
                if (dialPosition != 0) {
                    ++zeroPassCount;
                }
                dialPosition = 100 - (val - dialPosition);
            } else {
                dialPosition -= val;
                if (0 == dialPosition) {
                    ++zeroPassCount;
                }
            }
        } else if ('R' == symbol) {
            if (dialPosition + val >= 100) {
                ++zeroPassCount;
                dialPosition = (val + dialPosition) - 100;
            } else {
                dialPosition += val;
            }
        }

        if (0 == dialPosition) {
            ++zeroCount;
        }
    }
    inputFile.close();

    std::cout << zeroCount << std::endl;
    std::cout << zeroPassCount << std::endl;

    return 0;
}
