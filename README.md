# Cowtan & Tout Mobile Application

A mobile application put together at the request of Cowtan & Tout. Application allows for user verification, barcode scanning, and "checkout" of scanned fabrics at C&T's showrooms. 

## Architecture

### Database Structure / Objects

The following represent the two tables in the SQL database that will hold client information and product information. Columns are subject to change.

#### Clients

- accnum: Client's account number, will probably act as SQL primary key
- firstname: Client's first name
- lastname: Client's last name
- company: Company that the client represents
- address: Address of company
- phonenum: Phone number of client or company represented, used for account verification. May need cleaning up, depending on format (xxx-xxx-xxxx, etc)

#### Products

- productnum: Product number of each fabric, will probably act as SQL primary key and will correspond to barcode ID
- name: Simple name of fabric, e.g. "Lynx"
- color: Simple color description of the fabric, e.g. "aqua"
- price: Price of the fabric
- brand: Brand of the fabric, e.g. "Jane Churchill"

## Directory Structure

|Resource     | Description   |
|-------------|---------------|
| /           | Root Directory |


## TODO
- Touch up 'Confirm Screen'
- Change 'back' on Confirm Screen?
- Change 'back' on Shopping Cart to Log out??? and have a AlertIOS before it logs out
- Make 'cancel' button in barcode scanner - possibly remove navigator??
- Have some default text in Shopping Cart??
- String equality in RenderRow
