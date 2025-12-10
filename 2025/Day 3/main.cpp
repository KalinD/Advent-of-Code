#include <iostream>
#include <fstream>
#include <string>
#include <vector>

unsigned long long myPow(unsigned long long base, unsigned long long power) {
    unsigned long long res = 1U;
    for(unsigned long long i = 0; i < power; ++i) {
        res *= base;
    }
    return res;
}

unsigned long long getLargestJolts(std::vector<unsigned char> digits, unsigned char selectedCount) {
    signed char index = digits.size() - selectedCount;
    signed char prevMaxIndex = -1;
    signed char maxIndex = digits.size() - selectedCount;
    unsigned char max = 0U;
    unsigned long long res = 0U;
    while (selectedCount > 0) {
        while (index > prevMaxIndex) {
            if(digits.at(index) >= max) {
                max = digits.at(index);
                maxIndex = index;
            }
            --index;
        }
        prevMaxIndex = maxIndex;
        index = digits.size() - (selectedCount - 1);
        res += max * myPow(10, (selectedCount - 1));
        max = 0U;
        --selectedCount;
    }

    return res;
}
// 16973
std::vector<unsigned char> stringToDigitVector(std::string line) {
    std::vector<unsigned char> res;
    res.reserve(line.size());
    for(const char& c : line) {
        if(('0' > c) || ('9' < c)) continue;
        res.push_back(c - '0');
    }

    return res;
}

void partOne() {
    unsigned long long res = 0;
    std::ifstream inputFile("./input.txt");
    std::string line;
    std::vector<unsigned char> digits;
    const unsigned char selectedCount = 2U;
    unsigned char temp = 0U;
    while(std::getline(inputFile, line)) {
        digits = stringToDigitVector(line);
        res += getLargestJolts(digits, selectedCount);
    }
    std::cout << "    Res: " << res << std::endl;
}

void partTwo() {
    unsigned long long res = 0;
    std::ifstream inputFile("./input.txt");
    std::string line;
    std::vector<unsigned char> digits;
    unsigned char temp = 0U;
    const unsigned char selectedCount = 12U;
    while(std::getline(inputFile, line)) {
        digits = stringToDigitVector(line);
        res += getLargestJolts(digits, selectedCount);
    }
    std::cout << "    Res: " << res << std::endl;
}

int main() {
    std::cout << "Part One:" << std::endl;
    partOne();
    std::cout << "Part Two:" << std::endl;
    partTwo();

    return 0;
}
