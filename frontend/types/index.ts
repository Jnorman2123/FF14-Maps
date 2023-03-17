export interface Quest {
    id: number
    name: string
    previousQuest: string
    level: number
    type: string
    class: string[]
}