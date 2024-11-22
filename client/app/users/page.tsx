import UserTable from '@/components/UserTable'
import React from 'react'

const getUserList = async () => {
  const request = await fetch("http://localhost:8000/users");
  const response = await request.json();
  return response;
}

export default async function UserList() {
  const userList = await getUserList();
  
  return (
    <div>
      <UserTable userList={userList}/>
    </div>
  )
}
