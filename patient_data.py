import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('patientTable')


def lambda_handler(event, context):
    method = event['httpMethod']
    path_params = event.get('pathParameters')

    try:
        if method == 'POST':
            return create_patient(event)

        elif method == 'GET' and path_params:
            return get_patient(path_params['patientId'])

        elif method == 'GET':
            return get_all_patients()

        elif method == 'PUT':
            return update_patient(event)

        else:
            return response(400, {'message': 'Unsupported method'})

    except Exception as e:
        return response(500, {'error': str(e)})


# -------------------------
# CREATE PATIENT
# -------------------------
def create_patient(event):
    body = json.loads(event['body'])

    table.put_item(Item={
        'patientId': body['patientId'],
        'fullName': body.get('fullName'),
        'age': body.get('age'),
        'gender': body.get('gender'),
        'contactNo': body.get('contactNo'),
        'department': body.get('department'),
        'doctorAssigned': body.get('doctorAssigned'),
        'visitDate': body.get('visitDate')
    })

    return response(201, {'message': 'Patient created'})


# -------------------------
# GET ONE PATIENT
# -------------------------
def get_patient(patient_id):
    result = table.get_item(Key={'patientId': patient_id})

    if 'Item' not in result:
        return response(404, {'message': 'Patient not found'})

    return response(200, result['Item'])


# -------------------------
# GET ALL PATIENTS
# -------------------------
def get_all_patients():
    result = table.scan()
    return response(200, result.get('Items', []))


# -------------------------
# UPDATE PATIENT
# -------------------------
def update_patient(event):
    body = json.loads(event['body'])

    table.update_item(
        Key={'patientId': body['patientId']},
        UpdateExpression="""
            SET fullName = :fn,
                age = :ag,
                gender = :gn,
                contactNo = :cn,
                department = :dp,
                doctorAssigned = :da,
                visitDate = :vd
        """,
        ExpressionAttributeValues={
            ':fn': body.get('fullName'),
            ':ag': body.get('age'),
            ':gn': body.get('gender'),
            ':cn': body.get('contactNo'),
            ':dp': body.get('department'),
            ':da': body.get('doctorAssigned'),
            ':vd': body.get('visitDate')
        }
    )

    return response(200, {'message': 'Patient updated'})


# -------------------------
# COMMON RESPONSE
# -------------------------
def response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(body)
    }
