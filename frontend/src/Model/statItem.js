export class ModelItem{
    constructor(name, gold, silver, bronze, gender, height, weight, nationality){
        this.name = name;
        this.gold = gold;
        this.sliver = silver;
        this.bronze = bronze;
        if(gender === "M"){
            this.gender = "♂"
        }else{
            this.gender = "♀️"
        }
        this.weight = weight;
        this.height = height;
        this.nationality = nationality
    }
}