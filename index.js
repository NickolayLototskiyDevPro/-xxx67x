const project = {
    participants: [],
    pricing: {},
    isBusy: false,

    init(participants, pricing) {
        if (participants instanceof Array
            && participants.every(item => item.hasOwnProperty('seniorityLevel')))
            this.participants = participants;
        this.pricing = pricing;
    },

    findParticipant(functor, callbackFunction) {

        this.isBusy = true;
        let participant = null;
        setTimeout(() => {

            participant = this.participants.find(functor);
            if (participant == undefined)
                participant = null;

            this.isBusy = false;
            callbackFunction(participant);
        });
    },

    findParticipants(functor, callbackFunction) {
        this.isBusy = true;
        setTimeout(() => {
            let partOfparticipants = this.participants.filter(functor);
            this.isBusy = false;
            callbackFunction(partOfparticipants);
        });
    },

    addParticipant(participantObject, callbackFunction) {
        this.isBusy = true;
        setTimeout(() => {
            try {
                if (participantObject !== undefined
                    && typeof participantObject === 'object'
                    && "seniorityLevel" in participantObject) {
                    this.participants.push(participantObject);
                    this.isBusy = false;
                    callbackFunction();
                } else {
                    throw new Error(err)
                }
            } catch (error) {
                this.isBusy = false;
                callbackFunction(error);
            }
            this.isBusy = false;
        });
    },

    removeParticipant(participantObject, callbackFunction) {
        this.isBusy = true;
        setTimeout(() => {
            try {
                if (participantObject !== undefined
                    && typeof participantObject === 'object'
                    && "seniorityLevel" in participantObject) {

                    let removedParticipant = null;

                    for (let i = 0; i < this.participants.length; i++) {
                        if (this.participants[i].seniorityLevel === participantObject.seniorityLevel
                            && this.participants[i].firstName === participantObject.firstName
                            && this.participants[i].lastName === participantObject.lastName) {
                            removedParticipant = this.participants.splice(i, 1)[0];
                            break;
                        }
                    }
                    this.isBusy = false;

                    callbackFunction(removedParticipant);
                } else {
                    throw new Error(err)
                }
            } catch (error) {
                this.isBusy = false;
                callbackFunction(null);
            }
            this.isBusy = false;
        });
    },

    setPricing(participantPriceObject, callbackFunction) {
        this.isBusy = true;
        setTimeout(() => {
            this.pricing = Object.assign({}, participantPriceObject);

            callbackFunction();
            this.isBusy = false;
        });
    },

    calculateSalary(periodInDays) {
        const workingHours = 8;
        let commonSalary = 0;
        let result = 0;

        for (let i = 0; i < this.participants.length; i++) {
            if (this.participants[i].seniorityLevel in this.pricing) {
                commonSalary += this.pricing[this.participants[i].seniorityLevel];
            } else {
                throw Error;
            }
        }
        result = commonSalary * workingHours * periodInDays;
        return result;
    }
}


module.exports = {
    firstName: 'Alexey',
    secondName: 'Derepa',
    task: project
}