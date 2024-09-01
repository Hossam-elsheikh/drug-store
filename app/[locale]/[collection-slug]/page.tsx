import React from 'react';

type Params = {
    "collection-slug": string;
};

const Home = ({ params }: { params: Params }) => {
    const category = params["collection-slug"];
    return (
        <div>{category}</div>
    );
};

export default Home;
