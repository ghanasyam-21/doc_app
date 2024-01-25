import React, { useEffect, useState, useRef } from 'react';
import Modal from './ModalCom'
import { addDoc, collection, deleteDoc, doc, onSnapshot} from 'firebase/firestore';
import {  useNavigate  } from 'react-router-dom';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
export default function Docs({ database }) {
    const [title, setTitle] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isMounted = useRef()
    let navigate = useNavigate();
    const [docsData, setDocsData] = useState([]);
    const collectionRef = collection(database, 'docsData')

    const addData = () => {
        addDoc(collectionRef, {
            title: title,
            docsDesc:""
        })
            .then(() => {
                alert('Data Added')
                handleClose() 
            })
            .catch(() => {
                alert('Cannot add document')
            })
    }
    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }))
        })
    }
    useEffect(() => {
        if (isMounted.current) {
            return
        }

        isMounted.current = true;
        getData()
    }, [])
    const getId = (id) => {
        navigate(`/EditDocs/${id}`)
    }
    // to delete doc
    function deleteDocm(id){
      const docRef= doc(database,'docsData',id)
      deleteDoc(docRef)
      .then(() => {
        alert('Data Deleted')
        handleClose()
      })
      .catch(() => {
        alert('Cannot delete data')
      })
    }
    return (
        <div className='docs-main'>
            <h1>DOCS APP</h1>
            <button className='add-docs' onClick={handleOpen}>
            <div className='add-btn'><AddIcon/>Add a Document</div>
            </button>
            <div className='grid-main'>
                {docsData.map((doc) => {
                    return (
                        <div className='grid-child' onClick={()=>getId(doc.id)}>
                            <div className='headingIcons'><h1>{doc.title}</h1>
                            <div>
                            <EditNoteOutlinedIcon onClick={()=>getId(doc.id)} />
                              <DeleteOutlineOutlinedIcon onClick={()=>deleteDocm(doc.id)}/>
                            </div>
                            
                            </div>
                            <div dangerouslySetInnerHTML={{__html: doc.docsDesc}} />
                        </div>
                    )
                })}
            </div>
            <Modal
                open={open}
                setOpen={setOpen}
                title={title}
                setTitle={setTitle}
                addData={addData}
            />
      </div> 
      )
}