import React , {Component} from 'react';
import { Text, View,Button,StyleSheet } from 'react-native';
import { Card , Icon} from 'react-native-elements';
import {  ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../Redux/ActionCreators';
import {  Modal } from 'react-native';
import { Rating } from 'react-native-elements';
import { TextInput } from 'react-native';
import { postcomment} from '../Redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


  

function RenderRating(props){
    
 return(

    <View >
                <Rating
                 showRating
                 onFinishRating = {value => props.updaterate(value)}
                 onChange = {value => props.updaterate(value)}
                 value ={props.state.rating}
                 style={{ paddingVertical: 10 , marginTop : 50 }}
                />

    </View>
 )

}


function RenderTextinput(props){
    return(
<View>
    <View  style= {{direction:"flex", flexDirection: "row", marginLeft:20, marginTop:40  }} >
    <Icon style= {{marginLeft:20}}  name={"user"} type='font-awesome' size={20} color="#000"/>
    <TextInput style= {{marginLeft :10 }}
        onChangeText={ text => props.updateauthor(text) }
        placeholder="Author"
        underlineColorAndroid="transparent"
    />
  </View>

  <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>




  <View  style= {{direction:"flex", flexDirection: "row", marginLeft:20, marginTop:40  }} >
    <Icon style= {{marginLeft:20}}  name={"comment"} type='font-awesome' size={20} color="#000"/>

    <TextInput style= {{marginLeft :10 }}
      onChangeText={ text => props.updatecomment(text) }
        placeholder="Comment"
        underlineColorAndroid="transparent"
    />
  </View>

  <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>


</View>
)
}



const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postcomment: (dishId,author,comment,rating) => dispatch(postcomment(dishId,author,comment,rating)),
})



function Rendermodel(props){
   return(
        <Modal animationType = {"slide"} transparent = {false}
          visible = {props.v}
          onDismiss = {()=>props.hide() }
          onRequestClose = {()=>props.hide() }>
              <View >
                  <RenderRating
                  updaterate = {props.updaterate}
                  state = {props.state}
                  />
                  <RenderTextinput  
                      updateauthor = {props.updateauthor}
                      updatecomment = {props.updatecomment}
                      
             
                  
                  />         
                <View >
                <View style ={{margin:20 }}></View>
                    <Button 
                     onPress = {() =>{ props.post(props.maxid,props.dishId,props.state.author,props.state.comment,props.state.rating), 
                  //  console.log(props.state.rating.value,"le rating est"),
                    props.hide()
                    }
                       
                          
                    }
                          color="#512DA8"
                         title="Submit" 
                    /> 
                    <View style ={{margin:20 }}></View>
                       <Button style ={{margin :40}}
                         onPress = {() =>{props.hide()}}
                          color="#D3D3D3"
                         title="Cancel" 
                    /> 

                </View>   
               </View>
         </Modal>
   )
}





function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                

                <View style= {{flex :1, flexDirection: "row" , justifyContent: "center"}}>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                     <Icon
                        raised
                        reverse
                        name={"pencil"}
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() =>props.comment() }
                        />
                 </View>
             </Card>
             </Animatable.View>
              
            );
        }
        else {
            return(<View></View>);
        }
}



function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>   
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
        </Animatable.View>
    );
}



class DishDetail extends Component {
    constructor(props){
        super(props)
        this.state= {
            author : "ll",
            comment :"",
            rating :3,
            showModal: false,
            
        }
        this.updateauthor = this.updateauthor.bind(this)
        this.updatecomment = this.updatecomment.bind(this)
        this.updaterate = this.updaterate.bind(this)
        this.post = this.post.bind(this)
        
    }
    updateauthor(value){
       this.setState({author : value})
    

    }
    updatecomment(value){
        this.setState({comment : value})
 
     }
     updaterate(value){
        this.setState({rating : {value}})
 
     }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    post(dishId,author,comment,rating){
        this.props.postcomment(dishId,author,comment,rating);
    }

    toggleModel(){
        this.setState({ showModal : !this.state.showModal})
        
    }

    static navigationOptions = {
        title: 'DishDetail'
    };

    render() {

        const dishId = this.props.navigation.getParam('dishId','');
   
        const idarray = this.props.comments.comments.map(  el=> Number(el.dishId))
        const maxid = Math.max.apply(Math , idarray) +1 
    
   

            return(
            
                 
           
                <ScrollView>
                <Rendermodel v={this.state.showModal}  hide={()=>this.toggleModel()} 
                updateauthor = {this.updateauthor}
                updatecomment = {this.updatecomment}
                updaterate = {this.updaterate}
                state= {this.state}
                post = {this.post}
                dishId = {dishId}
                maxid ={maxid}
             
                />



                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    comment = {()=> this.toggleModel()}
    
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
               </ScrollView>
               
               )

        
       
    

     }
}

const styles = StyleSheet.create({

    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
      
        margin : 30
    }, 

    b : {
       
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);