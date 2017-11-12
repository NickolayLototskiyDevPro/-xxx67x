/* participantObject EXAMPLE */
/* Example: { firstName: 'Sergey', lastName: 'Zotenko', seniorityLevel: 'intermediate' } */
// const participantObject = {
//     firstName: string,
//     lastName: string,
//     seniorityLevel: string
// }

/* pricingObject EXAMPLE */
/* Example: { 'junior': 10 } */
// const pricingObject = {
//     roleName: number
// }

const project = {
    participants: [],
    pricing: {},
    isBusy: false,

    /* implement initialization of the object */
    /* participants - predefined array of participants */
    /* pricing - predefined object (keyvalue collection) of pricing */
    init(participants, pricing) {
        if (participants instanceof Array)
            this.participants = participants;
        this.pricing = pricing;
    },

    /* pass found participant into callback, stops on first match */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with found participant as argument or with null if not */
    /* callbackFunction (participant) => {} */
    findParticipant(functor, callbackFunction) {

        this.isBusy = true;

        setTimeout(() => {

            let participant = this.participants.find(functor);
            if (participant == undefined)
                participant = null;

            callbackFunction(participant);
            this.isBusy = false;
        });
    },

    /* pass array of found participants into callback */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
    /* callbackFunction (participantsArray) => {} */
    findParticipants(functor, callbackFunction) {
        this.isBusy = true;
        setTimeout(() => {
            let partOfparticipants = this.participants.filter(functor);
            callbackFunction(partOfparticipants);
            this.isBusy = false;
        });
    },

    /* push new participant into this.participants array */
    /* callbackFunction - function that will be executed when job will be done */
    /* (err) => {} */
    addParticipant(participantObject, callbackFunction) {
        this.isBusy = true;
        setTimeout(() => {
            try {
                if (participantObject !== undefined
                    && typeof participantObject === 'object'
                    && "seniorityLevel" in participantObject) {
                    this.participants.push(participantObject);
                    callbackFunction();
                } else {
                    throw new Error(err)
                }
            } catch (error) {
                callbackFunction(error);
            }
            this.isBusy = false;
        });
    },



    /* push new participant into this.participants array */
    /* callback should receive removed participant */
    /* callbackFunction - function that will be executed with object of removed participant or null if participant wasn't found when job will be done */
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

                    callbackFunction(removedParticipant);
                } else {
                    throw new Error(err)
                }
            } catch (error) {
                callbackFunction(null);
            }
            this.isBusy = false;
        });
    },

    /* Extends this.pricing with new field or change existing */
    /* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */
    setPricing(participantPriceObject, callbackFunction) {
        this.isBusy = true;
        setTimeout(() => {
            this.pricing = Object.assign({}, participantPriceObject);

            callbackFunction();
            this.isBusy = false;
        });
    },

    /* calculates salary of all participants in the given period */
    /* periodInDays, has type number, one day is equal 8 working hours */
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