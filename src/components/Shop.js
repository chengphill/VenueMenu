import React, { Component} from 'react';
import './Shop.css';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Menu, Sticky, Icon, Checkbox, Table, Divider } from 'semantic-ui-react';
import piggy3 from './images/piggy3.jpg'
import piggy2 from './images/piggy2.jpg'
import piggy1 from './images/piggy1.jpg'


class Shop extends Component {
    render() {
        return (
            <div className="shop-container" id ='sectionShop'>
                <div className="categories">
                <Image src= {piggy3} size='medium' circular centered />
                    <h2>Limited 1 month free trial</h2>
                    <React.Fragment>
                    <Divider horizontal>
      <Header as='h4'>
        <Icon name='bar chart' />
        Specifications
      </Header>
    </Divider>

    <Table definition>
      <Table.Body>
        <Table.Row>
          <Table.Cell width={4}>Price</Table.Cell>
          <Table.Cell>Free</Table.Cell>
        </Table.Row>
        <Table.Row>
        <Table.Cell>Maintenance</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
          </Table.Row>
          <Table.Row>
          <Table.Cell>Personalization</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
        </Table.Row>
        <Table.Row>
        <Table.Cell>Software Updates</Table.Cell>
          <Table.Cell>No</Table.Cell>
        </Table.Row>

        <Table.Row>
        <Table.Cell>Priority Support</Table.Cell>
          <Table.Cell>None</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </React.Fragment>
                    
                </div>
                <div className="categories">
                <Image src= {piggy2} size='medium' circular centered />
                    <h2>Monthly</h2>
                    <React.Fragment>
                    <Divider horizontal>
      <Header as='h4'>
        <Icon name='bar chart' />
        Specifications
      </Header>
    </Divider>

    <Table definition>
      <Table.Body>
        <Table.Row>
          <Table.Cell width={4}>Price</Table.Cell>
          <Table.Cell>3.99$ per month</Table.Cell>
        </Table.Row>
        <Table.Row>
        <Table.Cell>Maintenance</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
          </Table.Row>
          <Table.Row>
          <Table.Cell>Personalization</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Software Updates</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Priority Support</Table.Cell>
          <Table.Cell>Second</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </React.Fragment>

                    
                </div>
                <div className="categories">
                <Image src= {piggy1} size='medium' circular centered />
                    <h2>Yearly</h2>
                    <React.Fragment>
                    <Divider horizontal>
      <Header as='h4'>
        <Icon name='bar chart' />
        Specifications
      </Header>
    </Divider>

    <Table definition>
      <Table.Body>
        <Table.Row>
          <Table.Cell width={4}>Price</Table.Cell>
          <Table.Cell>3.20$ per month</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Maintenance</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Personalization</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
        </Table.Row>
        <Table.Row>
        <Table.Cell>Software Updates</Table.Cell>
          <Table.Cell>Yes</Table.Cell>
        </Table.Row>
        <Table.Row>
        <Table.Cell>Priority Support</Table.Cell>
          <Table.Cell>First</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </React.Fragment>
                    
                </div>
            </div>
        );
    }
}

    

export default Shop;