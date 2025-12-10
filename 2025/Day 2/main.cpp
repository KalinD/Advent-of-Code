#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <cstdlib>

unsigned long long myPow(unsigned long long base, unsigned long long power) {
    unsigned long long res = 1U;
    for(unsigned long long i = 0; i < power; ++i) {
        res *= base;
    }
    return res;
}

std::vector<std::string> split(std::string str, std::string separator) {
    std::vector<std::string> res;
    std::size_t index = 0;

    while(!str.empty() && std::string::npos != index) {
        index = str.find(separator);
        res.push_back(str.substr(0, index));
        str = str.substr(index + separator.size());
    }

    return res;
}

bool hasRepeatPattern(unsigned long long val) {
    unsigned char valLength = 0;
    unsigned long long valCopy = val;
    while (valCopy > 0) {
        ++valLength;
        valCopy /= 10;
    }

    if (valLength % 2 != 0) {
        return false;
    } else {
        return (val % (myPow(10, (valLength / 2)))) == (val / (myPow(10, (valLength / 2))));
    }
}

bool hasRepeatSequence(unsigned long long val) {
    std::string strVal = std::to_string(val);
    std::vector<std::size_t> positions;
    std::size_t startPos = 0;
    std::size_t distance = 0;
    std::size_t lastValid = strVal.size();
    positions.push_back(0);

    for(std::size_t i = 1; i < strVal.size(); ++i) {
        while((i < strVal.size()) && (strVal.at(startPos) == strVal.at(i))) {
            if(strVal.size() == lastValid) {
                lastValid = i;
            }
            distance = i - startPos;
            ++startPos;
            ++i;
        }
        if((i == strVal.size()) && (strVal.size() % distance == 0)) {
            return true;
        } else if (strVal.size() != lastValid) {
            i = lastValid;
            lastValid = strVal.size();
        }
        startPos = 0;
    }

    return false;
}

unsigned long long repeatNum(unsigned long long num, unsigned char repeatCount) {
    unsigned long long res = num;
    for(unsigned char i = 0; i < repeatCount - 1U; ++i) {
        res = res * 10 + num;
    }
    return res;
}

unsigned long long getSequencesSum(unsigned long long lowerBound, unsigned long long upperBound) {
    unsigned char lowerLength = 0U;
    unsigned char upperLength = 0U;
    unsigned long long valCopy = lowerBound;
    unsigned long long res = 0U;
    while (valCopy > 0U) {
        ++lowerLength;
        valCopy /= 10U;
    }
    valCopy = upperBound;
    while (valCopy > 0U) {
        ++upperLength;
        valCopy /= 10U;
    }

    unsigned char counter = 0;
    unsigned char multiplier = 0;
    unsigned long long repeatPart = lowerBound / (myPow(10, lowerLength));
    unsigned long long number = repeatNum(repeatPart, lowerBound);
    while (number < upperBound) {
        if (number >= lowerBound) {
            res += number;
        } else {
            counter = 0;
            ++multiplier;
        }
        if (10 >= counter) {
            counter = 0;
            ++multiplier;
        }
        repeatPart = (lowerBound / (myPow(10, lowerLength))) * (myPow(10, multiplier)) + counter;
        ++counter;
    }

    return res;
}

void partOne() {
    unsigned long long res = 0;

    std::ifstream inputFile("./input.txt");
    std::string line;
    std::getline(inputFile, line);
    std::vector<std::string> ranges = split(line, ",");
    std::vector<std::string>::iterator it;

    for(it = ranges.begin(); it != ranges.end(); ++it) {
        std::string lower = (*it).substr(0, (*it).find("-"));
        std::string upper = (*it).substr((*it).find("-") + 1);
        const char* lowerP = lower.c_str();
        const char* upperP = upper.c_str();
        unsigned long long lowerBound = std::strtoull(lowerP, nullptr, 10);
        unsigned long long upperBound = std::strtoull(upperP, nullptr, 10);
        for(unsigned long long i = lowerBound; i <= upperBound; ++i) {
            if (hasRepeatPattern(i)) {
                res += i;
            }
        }
    }

    std::cout << "Result: " << res << std::endl;
}

void partTwo() {
    unsigned long long res = 0;

    std::ifstream inputFile("./input.txt");
    std::string line;
    std::getline(inputFile, line);
    std::vector<std::string> ranges = split(line, ",");
    std::vector<std::string>::iterator it;

    for(it = ranges.begin(); it != ranges.end(); ++it) {
        std::string lower = (*it).substr(0, (*it).find("-"));
        std::string upper = (*it).substr((*it).find("-") + 1);
        const char* lowerP = lower.c_str();
        const char* upperP = upper.c_str();
        unsigned long long lowerBound = std::strtoull(lowerP, nullptr, 10);
        unsigned long long upperBound = std::strtoull(upperP, nullptr, 10);
        for(unsigned long long i = lowerBound; i <= upperBound; ++i) {
            if (hasRepeatSequence(i)) {
                res += i;
            }
        }
    }

    std::cout << "Result: " << res << std::endl;
}

void partTwo2() {
    unsigned long long res = 0;

    std::ifstream inputFile("./input2.txt");
    std::string line;
    std::getline(inputFile, line);
    std::vector<std::string> ranges = split(line, ",");
    std::vector<std::string>::iterator it;

    for(it = ranges.begin(); it != ranges.end(); ++it) {
        std::string lower = (*it).substr(0, (*it).find("-"));
        std::string upper = (*it).substr((*it).find("-") + 1);
        const char* lowerP = lower.c_str();
        const char* upperP = upper.c_str();
        unsigned long long lowerBound = std::strtoull(lowerP, nullptr, 10);
        unsigned long long upperBound = std::strtoull(upperP, nullptr, 10);
        res += getSequencesSum(lowerBound, upperBound);
    }

    std::cout << "Result: " << res << std::endl;
}

int main() {
    partOne();
    partTwo();
    return 0;
}
