export const messages = {
    newPositionSubject: 'new position for you',
    positionRemoveSubject: 'position was removed',
    newPropositionWithJapanese:
        (category:string, level:string):string => `hello dear User, we have a new proposition for you: ${category} developer with japanese knowledge for your ${level} level`,
    newPropositionWithoutJapanese:
        (category:string, level:string):string => `hello dear User, we have a new proposition for you: ${category} developer for your ${level} level`,
    propositionWithJapaneseRemoved: (category:string, level:string):string => `hello dear User, proposition ${category} developer for ${level} with japanese was removed, good luck with a new propositions`,
    propositionWithoutJapaneseRemoved: (category:string, level:string):string => `hello dear User, proposition ${category} developer for ${level} was removed, good luck with a new propositions`,
};
