import React from 'react'

type Props = {
    params: {
        term: string;
    };
};


function SearchPage({ params }: Props) {
    const { term } = params;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col space-y-4 mt-32 xl:mt-42">
                <h1 className="text-6xl font-semibold px-10">
                    Search Results For {term}
                </h1>
                {/* Add more search result components here */}
            </div>
        </div>
    );
}

export default SearchPage;
