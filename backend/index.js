const express = require('express')
const axios = require('axios')
const app = express()
const port = 9876


const WINDOW_SIZE = 10;
let windowPrevState = [];
let windowCurState = [];

const THIRD_PARTY_API = 'exampleurl';

app.get('/numbers/:numberID' ,async (req ,res) =>{
    const {numberId} = req.params;

    const validIds = ['p','f','e','r'];
    if(!validIds.includes(numberId)){
        return res.status(400).json({error: "invalid number ID"});
    }
    try {
        const response = await axios.get(`${THIRD_PARTY_API}/${numberId}`);
        const newNumbers = response.data.numbers;

        newNumbers.forEach(num=>{
            if(!windowCurState.includes(num)){
                if(windowCurState.length >= WINDOW_SIZE){
                    windowCurState.shift();
                }
                windowCurState.push(num);
            }
        });

        const avg = windowCurState.length > 0
        ? windowCurState.reduce((sum ,num) => sum +num ,0) / windowCurState.length : 0;

        res.json({
            windowPrevState,
            windowCurState,
            numbers:newNumbers,
            avg
        });

        windowPrevState =[...windowCurState];
    } catch (error) {
        res.status(500).json({error:'Failed to fetch numbers from third-party server'});
    }
});


app.listen(port , ()=>{
    console.log(`Average Calculator Microservice running on http://localhost:${port}`);
})