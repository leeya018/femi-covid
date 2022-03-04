import React, { useState } from 'react'
import apiIsutit from '../apiIsutit'
import api from '../api'


const URER_ID = '300628583'
const WORKER_ID = '8184'
const HOUR_RATE = 29
const TRANSFER_RATE = 40
const RATE_PER_TEST = 3





export default function MonthlySalary() {
    let currDate = new Date()
    let currMonth = currDate.getMonth() + 1
    let currYear = currDate.getFullYear()

    const [month, setMonth] = useState(currMonth)
    const [year, setYear] = useState(currYear)

    const [wageForTime, setWageForTime] = useState()
    const [wageForTransfer, setWageForTransfer] = useState()
    const [wageForTests, setWageForTests] = useState()




    function login() {
        let payload = {
            userid: URER_ID,
            workerid: WORKER_ID
        }
        apiIsutit.checkWorkerLogin(payload).then((res) => {
            if (res.status !== 200) {
                console.log("error")
            }
            else { // good
                console.log(res.status)
                console.log(res.data)
                let token = res.data.bearer
                localStorage.setItem("isufitToken", token)

            }
        })
    }

    function getMonthStr() {
        return month < 10 ? `0${month}` : `${month}`
    }

    function fromStrToMinutes(strTime) {
        let splitTime = strTime.split(':')
        let totalTime = parseInt(splitTime[0]) * 60 + parseInt(splitTime[1])
        return totalTime
    }

    function sumHours(totalHours, day) {
        return totalHours + (day.SAC !== '' ? fromStrToMinutes(day.SAC) : 0)


    }

    function sumAllHoursOfWork(workingDays) {
        let amountOfHours = 0
        return workingDays.reduce(sumHours, amountOfHours)
    }

    async function getWorkerAttendance() {

        let monthStr = getMonthStr()
        let payload = {
            userid: WORKER_ID,
            start: `01-${monthStr}-2022`,
            end: `28-${monthStr}-2022`,
            ismanager: 'False',
            role_code: 14
        }

        return new Promise((resolve, reject) => {
            apiIsutit.getWorkerAttendance(payload).then(res => {
                if (res.status !== 200) {
                    console.log("error")
                    reject("error")
                }
                else { // good
                    console.log(res.status)
                    console.log("GetWorkerAttendance")
                    console.log(res.data)
                    let totalTimeInMinutes = sumAllHoursOfWork(res.data)
                    let TotalTimeInHours = totalTimeInMinutes / 60
                    // alert(totalTime)
                    resolve(TotalTimeInHours)
                }
            })
        })


    }

    async function calcMoneyForHours() {
 
        let timeInHours = await getWorkerAttendance()
        setWageForTime(timeInHours * HOUR_RATE)

    }

    function devideDate(dateStr) {
        let d = new Date(dateStr)
        let m = d.getMonth() + 1
        let y = d.getFullYear()
        return {
            m,
            y
        }

    }

    function getReceptionInMonth(receptions) {
        return receptions.filter(rec => {
            let { y, m } = devideDate(rec.createdDate)
            if (month === m && year === y) {
                return rec
            }
        })
    }


    function getAmountOfChanges(monthsReceptions) {
        let tempDay = new Date(monthsReceptions[0].createdDate).getDate()
        let countOfTransfer = monthsReceptions.reduce((count, rec) => {
            let nextDate = new Date(rec.createdDate).getDate()
            if (nextDate === tempDay) {
                return count + 1
            }
            else {
                tempDay = nextDate
                return count
            }
        }, -1)
        return countOfTransfer
    }

    function fliterMe(arr) {
        return arr.filter(client => [2, 3, 4].includes(client.status));

    }

    async function getValidClients(coordsId) {
        let res = await api.getClients(coordsId)
        return fliterMe(res.data)
    }

    async function sumAmountOfTests(monthsRecepions) {

        return await monthsRecepions.reduce(async (countClients, rec) => {
            let validClients = await getValidClients(rec.id)
            return (await countClients) + validClients.length
        }, 0)



    }

    async function calcBonus() {
        let res = await api.getAllReceptions()
        let receptions = res.data
        console.log(receptions)

        let monthsRecepions = getReceptionInMonth(receptions)
        console.log(monthsRecepions)
        let amountOfTransfers = getAmountOfChanges(monthsRecepions)
        console.log(amountOfTransfers)
        setWageForTransfer(amountOfTransfers * TRANSFER_RATE)

        // tests in general 
        let amountOfTests = await sumAmountOfTests(monthsRecepions)
        console.log(amountOfTests)
        setWageForTests(amountOfTests * RATE_PER_TEST)
    }

    async function calc(){
        if (localStorage.getItem("isufitToken") == null) {
            await login()
        }

        await calcMoneyForHours()
        await calcBonus()
    }


    return (

        <div>
            <h1>Monthly Salary</h1>
            <label htmlFor="">month</label><input type="number" value={month} onChange={e=>setMonth(parseInt(e.target.value))}/><br />
            <label htmlFor="">year</label><input type="number" value={year} onChange={e=>setYear(parseInt(e.target.value))}/><br />

            <button onClick={calc}>calc</button>
            {wageForTime && <span>money for hour: {wageForTime.toFixed()}</span>}
            <br />
            {wageForTransfer && <span>money for transfer: {wageForTransfer}</span>}
            <br />
            {wageForTests && <span>money for tests: {wageForTests}</span>}
            <br />
            {wageForTime && wageForTransfer && wageForTests && <span>total money per month: {wageForTests + wageForTransfer + wageForTime}</span>}



        </div>
    )
}
