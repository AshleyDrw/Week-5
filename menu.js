class Champagne {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
    describe() {
        return `You've selected ${quantity} glasses of ${this.name}.`;
    }
}
class Mixer {
    constructor(name) {
        this.name = name;
        this.mimosa = [];
    }
    addChampagne(champagne) {
        if (champagne instanceof Champagne) {
            this.mimosa.push(champagne);
        } else {
            throw new Error(`You can only add an instance of ${champagne}.  Argument is not a player: ${champagne}`);
        }
    }
    describe() {
        return `${this.name} has ${this.mimosa.length} mimosas.`;
    }
}

class Menu { 
    constructor() {
        this.mixers = [];
        this.selectedMimosa = null;
    }
    
    start() {
        let selection = this.showMainMenuOptions();
        
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createMimosa();
                    break;
                case '2':
                    this.viewMimosa();
                    break;
                case '3':
                    this.deleteMimosa();
                    break;
                case '4':
                    this.displayMimosa();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Cheers!');
    }
    
    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create mimosa
        2) view mimosa
        3) delete mimosa
        4) display all mimosas
        `);
    }
    showMimosaMenuOptions(mimosaInfo) {
        return prompt(`
        0) back
        1) add mixer
        2) delete mixer
        ------------------
        ${mimosaInfo}
        `);
    }
    displayMimosa() {
        let mimosaString = '';
        for (let i = 0; i < this.mixers.length; i++) {
            mimosaString += i + ') ' + this.mixers[i].name + '\n';  
        }
        alert(mimosaString);
    }
    createMimosa() {
        let name = prompt('Enter name your champagne preference:');
        this.mixers.push(new Mixer(name));
    }
    viewMimosa() {
        let index = prompt('Enter the index of the mimosa you wish to view:');
        if (index > -1 && index < this.mixers.length) {
            this.selectedMimosa = this.mixers[index];
            let description = 'Champagne: ' + this.selectedMimosa.name + '\n';
            for (let i = 0; i < this.selectedMimosa.mimosa.length; i++) {
                description += i + ') ' + 'Mixer: ' + this.selectedMimosa.mimosa[i].name + '\n';
            }
            
            let selection = this.showMimosaMenuOptions(description);
            switch (selection) {
                case '1':
                    this.selectMixer();
                    break;
                case '2':
                    this.deleteMixer();
            }
        }
    }
    deleteMixer() {
        let index = prompt(`Enter the index of the team you wish to delete: `);
        if (index > -1 && index < this.mixers.length) {
            this.mixers.splice(index, 1);
        }
    }
    selectMixer() {
        let name = prompt(`Enter your mixer preference: `);
        this.selectedMimosa.mimosa.push(new Champagne(name));
    }
    deleteMimosa() {
        let index = prompt(`Enter the index of the mimosa you wish to delete: `);
        if (index > -1 && index < this.selectedMimosa.mimosa.length) {
            this.selectedMimosa.mimosa.splice(index, 1);
        }
    }
}
let menu = new Menu();
menu.start();