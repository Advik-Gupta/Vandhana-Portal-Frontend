// src/hooks/useMachineDetails.js
import { useState, useEffect } from "react";
import client from "../api/client";

const useMachineDetails = (id) => {
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createdByUser, setCreatedByUser] = useState(null);
  const [assignedEngineerUser, setAssignedEngineerUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await client.get(`machines/${id}`);
        setMachine(data);

        const [creatorRes, engineerRes] = await Promise.all([
          data.createdBy
            ? client.get(`users/${data.createdBy}`)
            : Promise.resolve({ data: null }),
          data.assignedEngineer
            ? client.get(`users/${data.assignedEngineer}`)
            : Promise.resolve({ data: null }),
        ]);

        setCreatedByUser(creatorRes.data);
        setAssignedEngineerUser(engineerRes.data);
      } catch (err) {
        setError("Failed to fetch machine details.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { machine, loading, error, createdByUser, assignedEngineerUser };
};

export default useMachineDetails;
