import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { RegisterForm } from "@prisma/client";
import { useRouter } from "next/router";

export default function Test() {
  const [id, setId] = useState<string>("");
  // const router = useRouter();
  // const { id, setId } = router.query;

  const [{ data },getRegister] = useAxios({
    url: `/api/registerForm/${id}`,
    method: "GET",
  });


  const [test, setTest] = useState<RegisterForm[]>([]);

  useEffect(() => {
    setTest(data?.registerForm);

    
  }, [data]);

  useEffect(() => {
    if (id) {
      getRegister().then((response) => {
        setTest(response.data?.registerForm);
      });
    }
  }, [id]);

  return (
    <div className=" bg-white">
      {test?.map((value) => (
        <div key={value.id}>
          {/* <td>{index + 1}</td> */}
          <p>{value.id}</p>
        </div>
        
        

      ))}
    </div>
  );
}
