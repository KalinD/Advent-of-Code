#include <iostream>
#include <string>
#include <fstream>
#include <vector>

unsigned long long myPow(unsigned long long base, unsigned long long power) {
    unsigned long long res = 1U;
    for(unsigned long long i = 0; i < power; ++i) {
        res *= base;
    }
    return res;
}

std::vector<unsigned long long> splitULL(std::string s) {
    std::vector<unsigned long long> res;
    std::size_t foundPos = s.find(" ");
    while(std::string::npos != foundPos) {
        if(0U == foundPos) {
            s = s.substr(1);
            foundPos = s.find(" ");
            continue;
        }
        std::string strNum = s.substr(0, foundPos);
        const char* charNum = strNum.c_str();
        unsigned long long num = std::strtoull(charNum, nullptr, 10);
        res.push_back(num);
        s = s.substr(foundPos + 1);
        foundPos = s.find(" ");
    }
    
    res.push_back(std::strtoull(s.c_str(), nullptr, 10));

    return res;
}

std::vector<char> splitChar(std::string s) {
    std::vector<char> res;
    
    for(char& c : s) {
        if(' ' != c) {
            res.push_back(c);
        }
    }

    return res;
}

void partOne() {
    std::ifstream file("./input.txt");
    std::string line;
    std::getline(file, line);
    std::vector<unsigned long long> line1 = splitULL(line);
    std::getline(file, line);
    std::vector<unsigned long long> line2 = splitULL(line);
    std::getline(file, line);
    std::vector<unsigned long long> line3 = splitULL(line);
    std::getline(file, line);
    std::vector<unsigned long long> line4 = splitULL(line);
    std::getline(file, line);
    std::vector<char> operations = splitChar(line);
    unsigned long long res = 0;

    for(std::size_t i = 0; i < operations.size(); ++i) {
        switch (operations.at(i))
        {
        case '*':
        {
            res += line1.at(i) * line2.at(i) * line3.at(i) * line4.at(i);
        }
            break;
        case '+':
        {
            res += line1.at(i) + line2.at(i) + line3.at(i) + line4.at(i);
        }
            break;
        default:
            break;
        }
    }

    std::cout << "    Result: " << res << std::endl;
}

void partTwo() {
    std::ifstream file("./input.txt");
    std::string line1;
    std::string line2;
    std::string line3;
    std::string line4;
    std::string operationsLine;
    std::getline(file, line1);
    std::getline(file, line2);
    std::getline(file, line3);
    std::getline(file, line4);
    std::getline(file, operationsLine);
    std::vector<char> operations = splitChar(operationsLine);
    unsigned long long res = 0;

    signed long long index = line1.size() - 1U;
    std::size_t operationIndex = operations.size() - 1U;

    while (index >= 0U)
    {
        unsigned long long tempRes = 0U;
        unsigned long long tempNum = 0U;
        if('+' == operations.at(operationIndex)) {
            tempRes = 0U;
        } else if ('*' == operations.at(operationIndex)) {
            tempRes = 1U;
        }

        while((index >= 0) && ((' ' != line1.at(index)) || (' ' != line2.at(index)) ||
              (' ' != line3.at(index)) || (' ' != line4.at(index)))) {
            tempNum = 0U;
            unsigned char power = 0U;
            if(' ' != line4.at(index)) {
                tempNum += (line4.at(index) - '0');
                ++power;
            }
            if(' ' != line3.at(index)) {
                tempNum += myPow(10, power) * (line3.at(index) - '0');
                ++power;
            }
            if(' ' != line2.at(index)) {
                tempNum += myPow(10, power) * (line2.at(index) - '0');
                ++power;
            }
            if(' ' != line1.at(index)) {
                tempNum += myPow(10, power) * (line1.at(index) - '0');
                ++power;
            }
            if('+' == operations.at(operationIndex)) {
                tempRes += tempNum;
            } else if ('*' == operations.at(operationIndex)) {
                tempRes *= tempNum;
            }
            --index;
        }
        --index;
        --operationIndex;
        res += tempRes;
    }
    
    std::cout << "    Result: " << res << std::endl;
}

int main() {
    std::cout << "Part One:\n";
    partOne();
    std::cout << "Part Two:\n";
    partTwo(); 

    return 0;
}
