import { useState, useEffect } from "react";
import Card from './Common/Card' 

function AllData() {
const [data, setData] = useState('');
    //const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';
    const baseUrl = 'http://3.140.113.245:3001';

    function getAllData() {
        fetch(`${baseUrl}/account/all`)
            .then(async (res) => {
                const data = await res.json();
                return setData(data);
            })
    }
    useEffect(() => {
        if (data === '') { getAllData() }
    }, [data]);

    if (data !== '')
        return (
            <Card
                bgcolor="secondary"
                header='All Data'
                body={
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(
                                    (user, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.balance}</td>
                                        </tr>
                                    )
                                )}

                            </tbody>
                        </table>


                    </>
                }
            />
        )
    else return (
        <Card
            bgcolor="primary"
            header='All Data'
            body={
                <>
                    <h5>No Data</h5>
                </>
            }
        />
    )
}

export default AllData
