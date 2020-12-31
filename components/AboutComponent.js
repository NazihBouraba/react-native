import React , {Component} from 'react';
import { Text ,View , ScrollView  } from 'react-native';
import { Card } from 'react-native-elements';
import {History} from "../shared/History"
import { LEADERS } from '../shared/leader';
import {  FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';



  


const renderMenuItem = ({item, index}) => {

    return (
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{ source: require('./images/alberto.png')}}
              />
    );
};





class About extends Component {
    constructor(props){
        super(props)
        this.state= {
          history : History ,
          leaders : LEADERS
        }
    }

    static navigationOptions = {
        title: 'About us'
    };


    render() {
     return(

        <ScrollView>
        <Card
        featuredTitle={"Our History"}
        
        >
            <Text style={{margin: 10 , marginBottom : 2, textAlign: "center" ,fontWeight: "bold", fontSize : 30 }}>
            Our History {"\n"}
            </Text>

            <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
            />
            <Text style={{margin: 10 , marginTop :50 , textJustify: "inter-word" ,textAlign: "left" }}>
    
            {this.state.history.content} {"\n"}
            </Text>
           
        </Card>


        <Card
        featuredTitle={"Corporate Leadership"}
        
        >
            <Text style={{margin: 10 , marginBottom : 2, textAlign: "center" ,fontWeight: "bold", fontSize : 30 }}>
            Corporate Leadership {"\n"}
            </Text>

            <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
            />


          <FlatList 
          data={this.state.leaders}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}
          />
           
        </Card>




        </ScrollView>
     )
    }


}

export default About