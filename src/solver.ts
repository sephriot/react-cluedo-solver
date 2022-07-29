function isPlayersCard(row: string[], mainPlayerCardTag: string[]) {
    return row.at(-1) === mainPlayerCardTag.at(0) && row.at(-2) === mainPlayerCardTag.at(1);
}

export default function solver(input: string[][]) {
    const mainPlayerCardTag = ['Gracz 0', 'Gracz 0']
    const knowledgeBase = new Map<string, string[]>()
    for (let row of input) {
        row = row.filter(e => e !== '')
        if (isPlayersCard(row, mainPlayerCardTag)) {
            knowledgeBase.set(row[0], mainPlayerCardTag)
        }
    }

    input = input.filter(row => !isPlayersCard(row, mainPlayerCardTag)) // delete main player's cards
    let changes = 1
    while (changes > 0) {
        changes = 0
        let toRemove : string[][] = []
        for (const row of input) {
            let rowCpy = [...row]
            if (knowledgeBase.get(row[0]) === mainPlayerCardTag ||
                knowledgeBase.get(row[0]) === [row.at(-2), row.at(-1)] ||
                (knowledgeBase.get(row[0]) !== undefined && (knowledgeBase.get(row.at(0) ?? "") || [])[1] !== row.at(-1)
                )) {
                rowCpy = rowCpy.filter(e => e !== row[0])
            }
            console.log(rowCpy)
            if (knowledgeBase.get(row[1]) === mainPlayerCardTag ||
                knowledgeBase.get(row[1]) === [row.at(-2), row.at(-1)] ||
                (knowledgeBase.get(row[1]) !== undefined && (knowledgeBase.get(row.at(1) ?? "") || [])[1] !== row.at(-1)
                )) {
                rowCpy = rowCpy.filter(e => e !== row[1])
            }
            console.log(rowCpy)
            if (knowledgeBase.get(row[2]) === mainPlayerCardTag ||
                knowledgeBase.get(row[2]) === [row.at(-2), row.at(-1)] ||
                (knowledgeBase.get(row[2]) !== undefined && (knowledgeBase.get(row.at(2) ?? "") || [])[1] !== row.at(-1)
                )) {
                rowCpy = rowCpy.filter(e => e !== row[2])
            }
            console.log(rowCpy)
            if(rowCpy.length === 3){
                knowledgeBase.set(rowCpy.at(0) ?? "x",[row.at(-2) ?? "", row.at(-1) ?? ""])
                toRemove.push(row)
                changes += 1
            }

            console.log(input.filter(r => r.toString() === row.toString()).length)
            if(rowCpy.length === 4 &&
                input.filter(r => r.toString() === row.toString()).length > 1) {
                knowledgeBase.set(rowCpy.at(0) ?? "x", [row.at(-2) ?? "", row.at(-1) ?? ""])
                knowledgeBase.set(rowCpy.at(1) ?? "x", [row.at(-2) ?? "", row.at(-1) ?? ""])
                changes += 1
                toRemove.push(row)
            }

            if(rowCpy.length === 5 &&
                input.filter(r => r.toString() === row.toString()).length > 2) {
                knowledgeBase.set(rowCpy.at(0) ?? "x", [row.at(-2) ?? "", row.at(-1) ?? ""])
                knowledgeBase.set(rowCpy.at(1) ?? "x", [row.at(-2) ?? "", row.at(-1) ?? ""])
                knowledgeBase.set(rowCpy.at(2) ?? "x", [row.at(-2) ?? "", row.at(-1) ?? ""])
                changes += 1
                toRemove.push(row)
            }
        }
        input = input.filter(r => toRemove.indexOf(r) === -1)
    }

    return knowledgeBase
}
