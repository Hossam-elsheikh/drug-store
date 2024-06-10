import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'next/link';

const DropList = ({id,title,subCategories}) => {
  return (
    <div>
  <Accordion>
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon />}
          aria-controls={`${title}-control`}
          id={id}
        >
          <h2 className='font-medium '>{title}</h2>
        </AccordionSummary>
        <AccordionDetails>
            <ul className='flex flex-col gap-2'>
                {subCategories.map((sub,i)=>
                <li key={i}>
                    <Link className='font-medium text-primaryColor hover:text-secColor' href={sub.src || "#"}>{sub.title}</Link>
                </li>
                )}
            </ul>
          {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
        </AccordionDetails>
      </Accordion>
     
    </div>
  )
}

export default DropList