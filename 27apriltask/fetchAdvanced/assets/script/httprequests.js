const baseURL = "https://northwind.vercel.app/api";


// get all Categories
export const getAllCategories = async () => {
    let globalData;
    await fetch(`${baseURL}/categories`).then(response => response.json())
        .then(data => {
            globalData = data;
        })
    return globalData;
}

// get category by ID
export const getAllCategoryByID = async (id) => {
    let globalData;
    await fetch(`${baseURL}/categories/${id}`)
        .then(response => response.json())
        .then(data => {
            globalData = data
        })
    return globalData;
}

// delete category by id
export const deleteCategoryByID = async (id) => {

    await fetch(`${baseURL}/categories/${id}`, {
        method: `DELETE`
    })

}
// post category
export const postCategory = async (category) => {
    fetch(`${baseURL}/categories`, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    });
    const createdCategory = await response.json();
    return createdCategory;



}

// put category by id 



export const editCategorybyId =async (id, category) =>{

    fetch(`${baseURL}/categories/${id}`,{
method : 'PUT',
headers : {
     'Content-Type': 'application/json'
}


    })
}
