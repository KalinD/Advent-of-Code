#include <iostream>
#include <string>
#include <fstream>
#include <vector>
#include <memory>
#include <set>

typedef struct
{
    unsigned long long lowBound;
    unsigned long long hightBound;
} Range_t;


void partOne() {
    std::ifstream file("./input.txt");
    std::string line;
    unsigned long long res = 0U;
    bool hasPassedEmptyLine = false;
    std::vector<Range_t> ranges;
    std::vector<unsigned long long> ids;

    while(std::getline(file, line)) {
        if ((line.empty()) || ((!line.empty()) && ("\r" == line))) {
            hasPassedEmptyLine = true;
            continue;
        }

        if(!hasPassedEmptyLine) {
            std::string lower = line.substr(0, line.find("-"));
            std::string upper = line.substr(line.find("-") + 1);
            const char* lowerP = lower.c_str();
            const char* upperP = upper.c_str();
            Range_t r;
            r.lowBound = std::strtoull(lowerP, nullptr, 10);
            r.hightBound = std::strtoull(upperP, nullptr, 10);
            ranges.push_back(r);

        } else {
            const char* id = line.c_str();
            ids.push_back(std::strtoull(id, nullptr, 10));
        }
    }

    for(unsigned long long& id : ids) {
        for(Range_t& range : ranges) {
            if((range.lowBound <= id) && (range.hightBound >= id)) {
                ++res;
                break;
            }
        }
    }

    std::cout << "    Result: " << res << std::endl;
}

std::vector<Range_t> optimizeRange(std::vector<Range_t> ranges) {
    unsigned short lastSize = 0;
    bool shouldAdd = false;
    while(ranges.size() != lastSize) {
        lastSize = ranges.size();
        std::vector<Range_t> copyRanges;
        for(Range_t& originRange : ranges){
            shouldAdd = true;
            for(Range_t& copyRange : copyRanges) {
                if ((copyRange.lowBound <= originRange.lowBound) && (originRange.lowBound <= copyRange.hightBound) &&
                (copyRange.lowBound <= originRange.hightBound) && (originRange.hightBound <= copyRange.hightBound)) {
                    // Range aleady in
                    shouldAdd = false;
                    break;
                } else if ((originRange.lowBound <= copyRange.lowBound) && (copyRange.lowBound <=originRange.hightBound) &&
                    (originRange.lowBound <= copyRange.hightBound) && (copyRange.hightBound <= originRange.hightBound)) {
                    // new range is larger
                    copyRange.lowBound = originRange.lowBound;
                    copyRange.hightBound = originRange.hightBound;
                    shouldAdd = false;
                    break;
                } else if ((copyRange.lowBound <= originRange.lowBound) && (originRange.lowBound <= copyRange.hightBound)) {
                    // low bound in
                    copyRange.hightBound = originRange.hightBound;
                    shouldAdd = false;
                    break;
                } else if ((copyRange.lowBound <= originRange.hightBound) && (originRange.hightBound <= copyRange.hightBound)) {
                    // high bound in
                    copyRange.lowBound = originRange.lowBound;
                    shouldAdd = false;
                    break;
                } else {
                    // No overlap
                }
            }
            if (shouldAdd) {
                copyRanges.push_back(originRange);
            }
        }

        ranges = copyRanges;
    }
    return ranges;
}

void partTwo() {
    std::ifstream file("./input.txt");
    std::string line;
    unsigned long long res = 0U;
    std::vector<Range_t> ranges;
    std::vector<unsigned long long> ids;

    while(std::getline(file, line)) {
        if ((line.empty()) || ((!line.empty()) && ("\r" == line))) {
            break;
        }

        std::string lower = line.substr(0, line.find("-"));
        std::string upper = line.substr(line.find("-") + 1);
        const char* lowerP = lower.c_str();
        const char* upperP = upper.c_str();
        Range_t r;
        r.lowBound = std::strtoull(lowerP, nullptr, 10);
        r.hightBound = std::strtoull(upperP, nullptr, 10);
        ranges.push_back(r);
    }

    ranges = optimizeRange(ranges);
    
    for(Range_t& range : ranges) {
        res += (range.hightBound - range.lowBound) + 1;
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
