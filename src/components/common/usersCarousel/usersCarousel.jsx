import {useEffect, useState} from "react";

import Carousel from "react-elastic-carousel";

import Card from "./card/card";
import {CarouselDiv} from "./usersCarousel.styled";
import axios from "axios";


const breakPoints = [
    {width: 1, itemsToShow: 1},
    {width: 200, itemsToShow: 2},
    {width: 500, itemsToShow: 3},
];

const UsersCarousel = () => {
    const [users, setUsers] = useState(null);

    useEffect(()=> {
        async function fetchData(){
            try{
                const res = await axios.get('recommendation/getrecommend');
                setUsers(res.data);
                console.log(res.data);
            }catch{

            }
        }
        fetchData();
    }, [])

    return (
        <CarouselDiv>
            {users?
                <Carousel breakPoints={breakPoints}
                          showArrows={false}
                          focusOnSelect={true}>
                    {users.map(user =>(
                        <Card key={user.displayUsername} data={user}/>
                    ))}
                </Carousel>:null}
        </CarouselDiv>
    )
}

export default UsersCarousel;