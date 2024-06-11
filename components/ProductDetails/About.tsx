import React from "react";

type AboutProps = {
  details?: string;
};

function About({ details }: AboutProps) {
  return (
    <section className="p-4 md:p-6 mt-6 md:mt-10 text-wrap ">
      <h1 className="text-lg font-semibold border-b-2">About this item</h1>
      <p className="mt-4 text-base font-normal leading-7 text-gray-800">
        {details
          ? details
          : "Lorem Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, ab. Ipsa cumque molestias tempore pariatur tempora, error, unde dolor corrupti expedita enim est dolores mollitia porro, quia ea quod impedit! ipsum dolor sit amet consectetur adipisicing elit. Hic sint fugiat, explicabo alias, fugit maiores sequi porro voluptas minima est repudiandae tenetur maxime, laboriosam consectetur repellat accusantium natus. Minus, rem. ipsum dolor sit amet consectetur adipisicing elit. Quis commodi sit maiores corporis veniam voluptatem excepturi sint molestias debitis nesciunt dolore, hic soluta eveniet, delectus, aperiam earum magni illum dolores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatum perspiciatis nisi sed consequatur iure repellat ad aperiam sapiente tempora nemo inventore maxime unde dolore, qui rem beatae possimus praesentium! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas omnis, nostrum in reprehenderit, odit, repellat voluptatem dicta aliquid ab quisquam expedita dolores perferendis amet animi exercitationem hic! Esse, praesentium ab. "}
      </p>
    </section>
  );
}

export default About;
