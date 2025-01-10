#include <iostream>
#include <vector>
#include <string>
#include <sstream>

using namespace std;

int main() {
    string riadok;
    vector<vector<int>> data;
    
    // Čítanie riadkov až do konca vstupu (CTRL+D alebo CTRL+Z)
    while (getline(cin, riadok)) {
        vector<int> cisla;
        stringstream ss(riadok);
        int cislo;
        
        // Spracovanie všetkých čísel v riadku
        while (ss >> cislo) {
            cisla.push_back(cislo);
        }
        
        // Pridanie riadku do hlavnej matice
        if (!cisla.empty()) {
            data.push_back(cisla);
        }
    }
    
    // Výpis načítaných dát
    for (const auto& riadok : data) {
        for (const auto& cislo : riadok) {
            cout << cislo << " ";
        }
        cout << endl;
    }
    
    return 0;
} 