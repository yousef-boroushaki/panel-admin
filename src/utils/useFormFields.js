import React,{useDebugValue, useState} from "react";
function useFormField(){
    const [fields,setFields]=useState()
    const handleChange=(e)=>{
        const inpName=e.target.name
        setFields({...fields,[inpName]:e.target.value})
    }
    useDebugValue(fields)
    return [fields,handleChange]
}
export default useFormField