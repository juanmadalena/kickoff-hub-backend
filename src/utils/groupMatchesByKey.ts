
export const groupMatchesByKey = (key: string, matches: any[]) => {

    if(!matches) return;

    try{
        const groupedMatches: any[] = matches.reduce((acc: any, match: any) => {
            let value = key === 'date' ? match[key].getTime() : match[key];
        
            const existingGroup = acc?.find((group: any) => group.title === value);
            
            if (!existingGroup) {
                acc.push({ title: value, data: [match] });
            } else {
                existingGroup.data.push(match);
            }
        
            return acc;
    
        }, []) || [];
        
        return groupedMatches;
    }catch(error){
        throw error;
    }
};