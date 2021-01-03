import React , {Component} from 'react';
import { Text ,View , ScrollView  } from 'react-native';
import { Card } from 'react-native-elements';
import {  FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }
  


const renderMenuItem = ({item, index}) => {

    return (
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{ source: {uri: baseUrl + item.image}}}
              />
    );
};





class About extends Component {


    static navigationOptions = {
        title: 'About us'
    };


    render() {
        if (this.props.leaders.isLoading) {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                       <Text style={{margin: 10 , marginBottom : 2, textAlign: "center" ,fontWeight: "bold", fontSize : 30 }}>
                          Our History {"\n"}
                           </Text>
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
                     <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                            <Text style={{margin: 10 , marginBottom : 2, textAlign: "center" ,fontWeight: "bold", fontSize : 30 }}>
                                Our History {"\n"}
                                </Text>
                            <Card
                                title='Corporate Leadership'>
                                <Text>history....</Text>
                            </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else {


      return(

        <ScrollView>
             <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
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
                
                        history...{"\n"}
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
                    data={this.props.leaders.leaders}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
                    
                    </Card>



                    </Animatable.View>
        </ScrollView>
      )}
    }


}

export default connect(mapStateToProps)(About);