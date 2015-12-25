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

## Directory Structure

|Resource     | Description   |
|-------------|---------------|

