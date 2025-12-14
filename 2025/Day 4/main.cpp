#include <iostream>
#include <fstream>
#include <string>
#include <vector>

const inline char PAPER = '@';
const inline char EMPTY = '.';
const inline char REMOVED = 'X';

// 1586 - Low

void printBoard(std::vector<std::vector<char>> grid) {
    for(std::size_t i = 0U; i < grid.size(); ++i) {
        for(std::size_t j = 0U; j < grid.at(0).size(); ++j) {
            std::cout << grid.at(i).at(j);
        }
        std::cout << std::endl;
    }
}

unsigned char paperOrRemoved(char const toCheck) {
    return ((PAPER == toCheck) || (REMOVED == toCheck) ? 1U : 0U);
}

unsigned char isPaper(char const toCheck) {
    return ((PAPER == toCheck) ? 1U : 0U);
}

void partOne() {
    unsigned long long res = 0;
    std::ifstream file("./input.txt");
    std::string line;
    std::vector<std::vector<char>> grid;

    while (std::getline(file, line)) {
        std::vector<char> row;
        for(char& c : line) {
            if ((PAPER == c) || (EMPTY == c)) {
                row.push_back(c);
            } else {
                continue;
            }
        }
        grid.push_back(row);
    }

    // printBoard(grid);
    // Check middle
    for(std::size_t i = 1U; i < grid.size() - 1; ++i) {
        for(std::size_t j = 1U; j < grid.at(0).size() - 1; ++j) {
            if(PAPER != grid.at(i).at(j)) continue;
            
            unsigned char surroundPaperCount = 0U;
            surroundPaperCount += paperOrRemoved(grid.at(i - 1).at(j - 1));
            surroundPaperCount += paperOrRemoved(grid.at(i - 1).at(j));
            surroundPaperCount += paperOrRemoved(grid.at(i - 1).at(j + 1));
            surroundPaperCount += paperOrRemoved(grid.at(i).at(j - 1));
            surroundPaperCount += paperOrRemoved(grid.at(i).at(j + 1));
            surroundPaperCount += paperOrRemoved(grid.at(i + 1).at(j - 1));
            surroundPaperCount += paperOrRemoved(grid.at(i + 1).at(j));
            surroundPaperCount += paperOrRemoved(grid.at(i + 1).at(j + 1));
            if(surroundPaperCount < 4) {
                ++res;
                grid.at(i).at(j) = REMOVED;
            }
        }
    }

    // Check edge cases
    for(std::size_t i = 0; i < grid.size(); ++i){
        if ((i == 0) || (i + 1 == grid.size())) {
            if(PAPER == grid.at(i).at(0)){
                ++res;
                grid.at(i).at(0) = REMOVED;
            } else if(PAPER == grid.at(i).at(grid.at(0).size() - 1)){
                ++res;
                grid.at(i).at(grid.at(i).size() - 1) = REMOVED;
            }
        } else {
            // Firs col
            unsigned char surroundPaperCount = 0U;
            if(PAPER == grid.at(i).at(0)) {
                surroundPaperCount += paperOrRemoved(grid.at(i - 1).at(0));
                surroundPaperCount += paperOrRemoved(grid.at(i + 1).at(0));
                surroundPaperCount += paperOrRemoved(grid.at(i - 1).at(1));
                surroundPaperCount += paperOrRemoved(grid.at(i).at(1));
                surroundPaperCount += paperOrRemoved(grid.at(i + 1).at(1));
                if(surroundPaperCount < 4) {
                    ++res;
                    grid.at(i).at(0) = REMOVED;
                }
            } 
            // Last col
            if(PAPER == grid.at(i).at(grid.at(0).size() - 1)) {
                surroundPaperCount = 0U;
                surroundPaperCount += paperOrRemoved(grid.at(i - 1).at(grid.at(0).size() - 1));
                surroundPaperCount += paperOrRemoved(grid.at(i + 1).at(grid.at(0).size() - 1));
                surroundPaperCount += paperOrRemoved(grid.at(i - 1).at(grid.at(0).size() - 2));
                surroundPaperCount += paperOrRemoved(grid.at(i).at(grid.at(0).size() - 2));
                surroundPaperCount += paperOrRemoved(grid.at(i + 1).at(grid.at(0).size() - 2));
                if(surroundPaperCount < 4) {
                    ++res;
                    grid.at(i).at(grid.at(0).size() - 1) = REMOVED;
                }
            }
        }
    }

    for(std::size_t j = 1U; j < grid.size() - 1; ++j){
        // First row
        unsigned char surroundPaperCount = 0U;
        if(PAPER == grid.at(0).at(j)) {
            surroundPaperCount += paperOrRemoved(grid.at(0).at(j - 1));
            surroundPaperCount += paperOrRemoved(grid.at(0).at(j + 1));
            surroundPaperCount += paperOrRemoved(grid.at(1).at(j - 1));
            surroundPaperCount += paperOrRemoved(grid.at(1).at(j));
            surroundPaperCount += paperOrRemoved(grid.at(1).at(j + 1));
            if(surroundPaperCount < 4) {
                ++res;
                grid.at(0).at(j) = REMOVED;
            }
        }
        // Last row
        if(PAPER == grid.at(grid.size() - 1).at(j)) {
            surroundPaperCount = 0U;
            surroundPaperCount += paperOrRemoved(grid.at(grid.size() - 1).at(j - 1));
            surroundPaperCount += paperOrRemoved(grid.at(grid.size() - 1).at(j + 1));
            surroundPaperCount += paperOrRemoved(grid.at(grid.size() - 2).at(j - 1));
            surroundPaperCount += paperOrRemoved(grid.at(grid.size() - 2).at(j));
            surroundPaperCount += paperOrRemoved(grid.at(grid.size() - 2).at(j + 1));
            if(surroundPaperCount < 4) {
                ++res;
                grid.at(grid.size() - 1).at(j) = REMOVED;
            }
        }
    }
    std::cout << "    Result: " << res << std::endl;
}

void partTwo() {
    unsigned long long res = 0;
    unsigned long long oldRes = 0;
    std::ifstream file("./input.txt");
    std::string line;
    std::vector<std::vector<char>> grid;

    while (std::getline(file, line)) {
        std::vector<char> row;
        for(char& c : line) {
            if ((PAPER == c) || (EMPTY == c)) {
                row.push_back(c);
            } else {
                continue;
            }
        }
        grid.push_back(row);
    }

    // printBoard(grid);
    do {
        oldRes = res;
        // Check middle
        for(std::size_t i = 1U; i < grid.size() - 1; ++i) {
            for(std::size_t j = 1U; j < grid.at(0).size() - 1; ++j) {
                if(PAPER != grid.at(i).at(j)) continue;
                unsigned char surroundPaperCount = 0U;
                surroundPaperCount += isPaper(grid.at(i - 1).at(j - 1));
                surroundPaperCount += isPaper(grid.at(i - 1).at(j));
                surroundPaperCount += isPaper(grid.at(i - 1).at(j + 1));
                surroundPaperCount += isPaper(grid.at(i).at(j - 1));
                surroundPaperCount += isPaper(grid.at(i).at(j + 1));
                surroundPaperCount += isPaper(grid.at(i + 1).at(j - 1));
                surroundPaperCount += isPaper(grid.at(i + 1).at(j));
                surroundPaperCount += isPaper(grid.at(i + 1).at(j + 1));
                if(surroundPaperCount < 4) {
                    ++res;
                    grid.at(i).at(j) = REMOVED;
                }
            }
        }

        // Check edge cases
        for(std::size_t i = 0; i < grid.size(); ++i){
            if ((i == 0) || (i + 1 == grid.size())) {
                if(PAPER == grid.at(i).at(0)){
                    ++res;
                    grid.at(i).at(0) = REMOVED;
                } else if(PAPER == grid.at(i).at(grid.at(0).size() - 1)){
                    ++res;
                    grid.at(i).at(grid.at(i).size() - 1) = REMOVED;
                }
            } else {
                // Firs col
                unsigned char surroundPaperCount = 0U;
                if(PAPER == grid.at(i).at(0)) {
                    surroundPaperCount += isPaper(grid.at(i - 1).at(0));
                    surroundPaperCount += isPaper(grid.at(i + 1).at(0));
                    surroundPaperCount += isPaper(grid.at(i - 1).at(1));
                    surroundPaperCount += isPaper(grid.at(i).at(1));
                    surroundPaperCount += isPaper(grid.at(i + 1).at(1));
                    if(surroundPaperCount < 4) {
                        ++res;
                        grid.at(i).at(0) = REMOVED;
                    }
                } 
                // Last col
                if(PAPER == grid.at(i).at(grid.at(0).size() - 1)) {
                    surroundPaperCount = 0U;
                    surroundPaperCount += isPaper(grid.at(i - 1).at(grid.at(0).size() - 1));
                    surroundPaperCount += isPaper(grid.at(i + 1).at(grid.at(0).size() - 1));
                    surroundPaperCount += isPaper(grid.at(i - 1).at(grid.at(0).size() - 2));
                    surroundPaperCount += isPaper(grid.at(i).at(grid.at(0).size() - 2));
                    surroundPaperCount += isPaper(grid.at(i + 1).at(grid.at(0).size() - 2));
                    if(surroundPaperCount < 4) {
                        ++res;
                        grid.at(i).at(grid.at(0).size() - 1) = REMOVED;
                    }
                }
            }
        }

        for(std::size_t j = 1U; j < grid.size() - 1; ++j){
            // First row
            unsigned char surroundPaperCount = 0U;
            if(PAPER == grid.at(0).at(j)) {
                surroundPaperCount += isPaper(grid.at(0).at(j - 1));
                surroundPaperCount += isPaper(grid.at(0).at(j + 1));
                surroundPaperCount += isPaper(grid.at(1).at(j - 1));
                surroundPaperCount += isPaper(grid.at(1).at(j));
                surroundPaperCount += isPaper(grid.at(1).at(j + 1));
                if(surroundPaperCount < 4) {
                    ++res;
                    grid.at(0).at(j) = REMOVED;
                }
            }
            // Last row
            if(PAPER == grid.at(grid.size() - 1).at(j)) {
                surroundPaperCount = 0U;
                surroundPaperCount += isPaper(grid.at(grid.size() - 1).at(j - 1));
                surroundPaperCount += isPaper(grid.at(grid.size() - 1).at(j + 1));
                surroundPaperCount += isPaper(grid.at(grid.size() - 2).at(j - 1));
                surroundPaperCount += isPaper(grid.at(grid.size() - 2).at(j));
                surroundPaperCount += isPaper(grid.at(grid.size() - 2).at(j + 1));
                if(surroundPaperCount < 4) {
                    ++res;
                    grid.at(grid.size() - 1).at(j) = REMOVED;
                }
            }
        }
    } while(res != oldRes);
    std::cout << "    Result: " << res << std::endl;
}

int main() {
    std::cout << "Part One:" << std::endl;
    partOne();
    std::cout << "Part Two:" << std::endl;
    partTwo();
    return 0;
}
