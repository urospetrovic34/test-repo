/* import React from 'react';

export const tFajl = () => {
    const mutation =  useMutation(
        async ({id1,id2,order1,order2}) => {
            console.log(id1,id2,order1,order2)

            const res1 = await axiosConfig.put(`/questions/${id1}`, {data:{"order":-466}})
            const res2 = await axiosConfig.put(`/questions/${id2}`, {data:{"order":-465}})
            const res3 = await axiosConfig.put(`/questions/${id1}`, {data:{"order":order2}})
            const res4 = await axiosConfig.put(`/questions/${id2}`, {data:{"order":order1}})
            console.log(res1,res2,res3,res4)
        },
        {
            onMutate:async (newOrder)=> {
                const previousState = queryClient.getQueryData(['questions',user.companyId])
                // console.log(user.companyId)
                // console.log(newOrder)
                // console.log(previousState)
                function reOrder(questionData) {
                    const questionReorder = questionData.map((question, index) => {
                        if (question.id === newOrder.id1) {
                            return {
                                ...question, attributes: {...question.attributes, order: newOrder.order2} 
                            }
                        }
                        else if (question.id === newOrder.id2) {
                            return {
                                ...question, attributes: {...question.attributes, order: newOrder.order1} 
                            }
                        }
                        else return question;
                    })
                    const tmpData = questionReorder.sort((firstElement,secondElement) => {
                        if (firstElement.order < secondElement.order) {
                            return -1
                        }
                        else if (firstElement.order > secondElement.order) {
                            return 1
                        }
                        else return 0
                    })
                    return tmpData
                }
                const newState = {
                    ...previousState, data: {
                        ...previousState.data, 
                        data: reOrder(previousState.data.data)
                    }
                }
                
                // console.log(newState)
                queryClient.setQueryData(['questions',user.companyId], newState)
                return {previousState}
            },
            onError:(err, newOrder, context) => {
                queryClient.setQueryData(['questions',user.companyId], context.previousState)
            },
            onSettled: () => {
                queryClient.invalidateQueries(['questions',user.companyId])

            }
        }

    )

    const handleOrderUp = (id)
 => {
        
        const currentIndex = companyQuestions.data.data.data.map(
            function(question){return question.id}
        ).indexOf(id)


        const currentObject = companyQuestions.data.data.data[currentIndex]
        const previousObject = companyQuestions.data.data.data[currentIndex-1]
        if(previousObject!==undefined) {
            mutation.mutate({"id1":currentObject.id,"id2":previousObject.id,"order1":currentObject.attributes.order,"order2":previousObject.attributes.order})
        }
    }
  return <div></div>;
};
 */