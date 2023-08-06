import { useState } from "react";

const clientId = 'bf57d7d988214b52bb2451faa1263683';
const clientSecret = '358b1b14f5d642ef8e3a3c3204bff5a4';
const tempToken = 'BQBEYPfvZW67YxznLp_L9YN2TLvtvNi6FtK-ap03aVfmxkBTdA5bENim9WnSf9EWyrm9rXOgc71O7gp7pVvxrScXQx1WcbYrxIgSuxgpaXdhJhGzRog';

const TestFetch = () => {
    const [token, setToken] = useState('');
    const [searchData, setSearchData] = useState(null);

    const handleButton = () => {
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: `client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&grant_type=client_credentials`
        })
            .then((response) => response.json())
            .then((token) => {
                setToken(token.access_token);
                console.log(token);
            })
    }

    const handleButton2 = () => {
        let value = 'soda stereo';
        fetch(`https://api.spotify.com/v1/search?q=${value}&type=album,track,artist,playlist`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${tempToken}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setSearchData(data);
                console.log(data);
            })
    }
    
    //math to figure out offset => (page number) * 20 - 20
    //"https://api.spotify.com/v1/search?query=soda+stereo&type=track&locale=en-US%2Cen%3Bq%3D0.9&offset=20&limit=20"
    const handleButton3 = () => {
        const offset = 3 * 20 - 20;
        let value = 'soda stereo';
        fetch(`https://api.spotify.com/v1/search?q=${value}&type=track&offset=${offset}&limit=20`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${tempToken}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
            .then((data) => {
                setSearchData(data);
                console.log(data);
            })
    }

    const handleButton4 = () => {
        let value = 'soda stereo';
        fetch(`https://api.spotify.com/v1/search?q=${value}&type=album,track,artist,playlist&limit=5`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${tempToken}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
            .then((data) => {
                setSearchData(data);
                console.log(data);
            })
    }

    const handleButton5 = () => {
        let value = 'soda stereo';
        let offset = 0;
        fetch(`https://api.spotify.com/v1/search?q=${value}&type=album&offset=${offset}&limit=20`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${tempToken}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
            .then((data) => {
                setSearchData(data);
                console.log(data);
            })
        
    }

    const handleButton6 = () => {
        let value = 'soda stereo';
        let offset = 0;
        fetch(`https://api.spotify.com/v1/search?q=${value}&type=album&offset=${offset}&limit=17`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${tempToken}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
            .then((data) => {
                setSearchData(data);
                console.log(data);
            })
    }

    const handleButton7 = () => {
        let value = 'soda stereo';
        let offset = 120;
        fetch(`https://api.spotify.com/v1/search?q=${value}&type=album&offset=${offset}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${tempToken}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
            .then((data) => {
                setSearchData(data);
                console.log(data);
            })
    }

    const handleButton8 = () => {
        let value = '0837';
        let offset = 0;
        fetch(`https://api.spotify.com/v1/search?q=${value}&type=artist&offset=${offset}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${tempToken}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
            .then((data) => {
                setSearchData(data);
                console.log(data);
            })
    }

    const handleButton9 = () => {
        fetch("https://api.spotify.com/v1/search?query=soda+stereo&type=album&locale=en-US%2Cen%3Bq%3D0.9&offset=140&limit=20", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${tempToken}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
            .then((data) => {
                setSearchData(data);
                console.log(data);
            })
    }

    

    return (  
        <div>
            <button onClick={handleButton}>fetch token</button>
            <button onClick={handleButton2}>fetch data</button>
            <button onClick={handleButton3}>fetch more data</button>
            <button onClick={handleButton4}>fetch data ENHANCED</button>
            <button onClick={handleButton5}>fetch 20 items</button>
            <button onClick={handleButton6}>fetch 17 items</button>
            <button onClick={handleButton7}>fetch SS 140</button>
            <button onClick={handleButton8}>fetch less than 20 results</button>
            <button onClick={handleButton9}>fetch next when items.length === 17</button>
        </div>
    );
}
 
export default TestFetch;