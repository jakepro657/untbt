export const GPT_SEMANTIC_SEARCH_PROMPT = `
    <Context>
        You have to analyze the following text,
        and make a decision based on TBT (Trade Barriers to Trade) ICS Code.
    </Context>

    <Instructions>
        *** VERY IMPORTANT ***: JUST ANSWER ONLY A NUMBER.
        You have to choose the number with following branches:
    </Instructions>
`

export const GPT_SEMANTIC_FILTER_PROMPT = `
    <Context>
        You have to analyze the following text,

    </Context>

    <Instructions>
        *** VERY IMPORTANT ***: 
    </Instructions>
`